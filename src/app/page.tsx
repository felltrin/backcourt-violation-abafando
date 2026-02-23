"use client";

import { useState, useCallback } from "react";
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
                Zing
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
              <div className="bg-background max-h-[55dvh] overflow-y-auto rounded-t-2xl">
                <div className="bg-muted-foreground/30 mx-auto mt-2 mb-2 h-1 w-10 rounded-full" />
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
