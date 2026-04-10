"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { MapView } from "~/components/uber/map-view";
import { BottomNav } from "~/components/uber/bottom-nav";
import { HomeScreen } from "~/components/uber/home-screen";
import { SearchPanel } from "~/components/uber/search-panel";
import { RideSelector } from "~/components/uber/ride-selector";
import { RideTracking } from "~/components/uber/ride-tracking";
import { ActivityScreen } from "~/components/uber/activity-screen";
import { AccountScreen } from "~/components/uber/account-screen";
import type { RideType } from "~/lib/mock-data";

type AppView = "home" | "search" | "select-ride" | "tracking";
type Tab = "home" | "activity" | "account";

export default function UberApp() {
  const [activeTab, setActiveTab] = useState<Tab>("home");
  const [view, setView] = useState<AppView>("home");
  const [destination, setDestination] = useState("");
  //   const [destinationAddress, setDestinationAddress] = useState("");
  const [selectedRide, setSelectedRide] = useState<RideType | null>(null);

  // Draggable panel state: stored as a percentage of viewport height (20-85)
  const [panelHeight, setPanelHeight] = useState(55);
  const isDragging = useRef(false);
  const [activeDrag, setActiveDrag] = useState(false);
  const dragStartY = useRef(0);
  const dragStartHeight = useRef(55);
  const panelRef = useRef<HTMLDivElement>(null);

  const handleDragStart = useCallback(
    (e: React.PointerEvent) => {
      isDragging.current = true;
      setActiveDrag(true);
      dragStartY.current = e.clientY;
      dragStartHeight.current = panelHeight;
      (e.target as HTMLElement).setPointerCapture(e.pointerId);
    },
    [panelHeight],
  );

  const handleDragMove = useCallback((e: React.PointerEvent) => {
    if (!isDragging.current) return;
    const deltaY = dragStartY.current - e.clientY;
    const deltaPercent = (deltaY / window.innerHeight) * 100;
    const newHeight = Math.min(
      85,
      Math.max(20, dragStartHeight.current + deltaPercent),
    );
    setPanelHeight(newHeight);
  }, []);

  const handleDragEnd = useCallback(() => {
    if (!isDragging.current) return;
    isDragging.current = false;
    setActiveDrag(false);
    // Snap to nearest breakpoint for a polished feel
    setPanelHeight((prev) => {
      if (prev < 30) return 25;
      if (prev < 50) return 40;
      if (prev < 65) return 55;
      return 80;
    });
  }, []);

  // Reset panel height when view changes
  useEffect(() => {
    setPanelHeight(55);
  }, [view]);

  const handleSearchClick = useCallback(() => {
    setView("search");
  }, []);

  //   const handleLocationSelect = useCallback((name: string, address: string) => {
  const handleLocationSelect = useCallback((name: string) => {
    setDestination(name);
    // setDestinationAddress(address);
    setView("select-ride");
  }, []);

  const handleSelectDestination = useCallback(
    // (name: string, address: string) => {
    (name: string) => {
      setDestination(name);
      //   setDestinationAddress(address);
      setView("select-ride");
    },
    [],
  );

  const handleConfirmRide = useCallback((ride: RideType) => {
    setSelectedRide(ride);
    setView("tracking");
  }, []);

  const handleRideComplete = useCallback(() => {
    setSelectedRide(null);
    setDestination("");
    // setDestinationAddress("");
    setView("home");
  }, []);

  const handleTabChange = useCallback(
    (tab: Tab) => {
      setActiveTab(tab);
      if (tab === "home" && view !== "tracking") {
        setView("home");
      }
    },
    [view],
  );

  const showMap =
    activeTab === "home" &&
    (view === "home" || view === "select-ride" || view === "tracking");

  const showBottomNav = view !== "search" && view !== "tracking";

  return (
    <div className="bg-background flex h-dvh flex-col overflow-hidden">
      {/* Map area */}
      {showMap && (
        <div className="relative flex-1">
          <MapView
            showRoute={view === "select-ride" || view === "tracking"}
            dropoffCoords={
              destination ? { lat: 37.7879, lng: -122.4074 } : undefined
            }
            driverLocation={
              view === "tracking" ? { lat: 37.78, lng: -122.42 } : undefined
            }
          />
          {/* Uber logo overlay */}
          <div className="absolute top-4 left-4 z-10">
            <div className="bg-background/80 rounded-lg px-3 py-1.5 backdrop-blur-md">
              <span className="text-foreground text-lg font-bold tracking-tight">
                ZingX
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Content panels */}
      <div
        className={
          activeTab !== "home"
            ? "flex-1 overflow-hidden"
            : view === "search"
              ? "flex-1 overflow-hidden"
              : ""
        }
      >
        {activeTab === "home" && (
          <>
            {view === "home" && (
              <div
                ref={panelRef}
                style={{ maxHeight: `${panelHeight}dvh` }}
                className={`bg-background overflow-y-auto rounded-t-2xl ${activeDrag ? "" : "transition-[max-height] duration-200 ease-out"}`}
              >
                {/* Drag handle */}
                <div
                  className="flex cursor-grab touch-none items-center justify-center py-2.5 active:cursor-grabbing"
                  onPointerDown={handleDragStart}
                  onPointerMove={handleDragMove}
                  onPointerUp={handleDragEnd}
                  onPointerCancel={handleDragEnd}
                  role="separator"
                  aria-orientation="horizontal"
                  aria-label="Drag to resize panel"
                  aria-valuenow={Math.round(panelHeight)}
                  aria-valuemin={20}
                  aria-valuemax={85}
                >
                  <div className="bg-muted-foreground/40 hover:bg-muted-foreground/60 h-1 w-10 rounded-full transition-colors" />
                </div>
                <HomeScreen
                  onSearchClick={handleSearchClick}
                  onLocationSelect={handleLocationSelect}
                />
              </div>
            )}

            {view === "search" && (
              <SearchPanel
                onBack={() => setView("home")}
                onSelectDestination={handleSelectDestination}
              />
            )}

            {view === "select-ride" && (
              <div className="bg-background rounded-t-2xl">
                <div className="bg-muted-foreground/30 mx-auto mt-2 mb-1 h-1 w-10 rounded-full" />
                <RideSelector
                  destination={destination}
                  onConfirm={handleConfirmRide}
                  onBack={() => {
                    setView("search");
                  }}
                />
              </div>
            )}

            {view === "tracking" && selectedRide && (
              <div className="bg-background rounded-t-2xl">
                <div className="bg-muted-foreground/30 mx-auto mt-2 mb-1 h-1 w-10 rounded-full" />
                <RideTracking
                  ride={selectedRide}
                  destination={destination}
                  onComplete={handleRideComplete}
                />
              </div>
            )}
          </>
        )}

        {activeTab === "activity" && <ActivityScreen />}
        {activeTab === "account" && <AccountScreen />}
      </div>

      {/* Bottom navigation */}
      {showBottomNav && (
        <BottomNav activeTab={activeTab} onTabChange={handleTabChange} />
      )}
    </div>
  );
}
