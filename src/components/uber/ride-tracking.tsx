"use client";

import { useState, useEffect } from "react";
import {
  Phone,
  MessageSquare,
  Shield,
  Share2,
  X,
  Star,
  Navigation,
} from "lucide-react";
import { type Driver, type RideType } from "~/lib/mock-data";
import { cn } from "~/lib/utils";
import { graphqlRequest, queries } from "~/lib/graphql-client";

interface RideTrackingProps {
  ride: RideType;
  destination: string;
  onComplete: () => void;
}

interface DriverResult {
  driver: Driver;
}

const EmptyDriver: Driver = {
  id: "",
  name: "",
  rating: 0,
  trips: 0,
  vehicle: "",
  licensePlate: "",
  eta: 0,
  avatarInitials: "",
};

type RideStatus = "matching" | "arriving" | "in-ride" | "rating";

export function RideTracking({
  ride,
  destination,
  onComplete,
}: RideTrackingProps) {
  const [status, setStatus] = useState<RideStatus>("matching");
  const [eta, setEta] = useState(0);
  const [rideEta, setRideEta] = useState(18);
  const [rating, setRating] = useState(0);
  const [hoveredStar, setHoveredStar] = useState(0);
  const [mockDriver, setMockDriver] = useState<Driver>(EmptyDriver);

  useEffect(() => {
    // TODO: change to fetch the closest driver instead of the hardcoded one
    const fetchData = async () => {
      try {
        const result = await graphqlRequest<DriverResult>(queries.GET_DRIVER, {
          id: "69a0c4a220eb4bdeaf751f2e",
        });
        setMockDriver(result.driver);
        setEta(result.driver.eta);
      } catch (error) {
        console.error("There has been an error fetching the data: ", error);
      }
    };

    void fetchData();
  }, []);

  useEffect(() => {
    if (status === "matching") {
      const timer = setTimeout(() => setStatus("arriving"), 2500);
      return () => clearTimeout(timer);
    }
  }, [status]);

  useEffect(() => {
    if (status === "arriving" && eta > 0) {
      const interval = setInterval(() => {
        setEta((prev) => {
          if (prev <= 1) {
            setStatus("in-ride");
            return 0;
          }
          return prev - 1;
        });
      }, 2000);
      return () => clearInterval(interval);
    }
  }, [status, eta]);

  useEffect(() => {
    if (status === "in-ride" && rideEta > 0) {
      const interval = setInterval(() => {
        setRideEta((prev) => {
          if (prev <= 1) {
            setStatus("rating");
            return 0;
          }
          return prev - 1;
        });
      }, 1500);
      return () => clearInterval(interval);
    }
  }, [status, rideEta]);

  if (status === "rating") {
    return (
      <div className="bg-background flex flex-col items-center gap-6 p-6">
        <div className="bg-secondary text-foreground flex h-16 w-16 items-center justify-center rounded-full text-lg font-bold">
          {mockDriver.avatarInitials}
        </div>
        <div className="text-center">
          <p className="text-foreground text-lg font-semibold">
            How was your trip?
          </p>
          <p className="text-muted-foreground text-sm">
            Rate your ride with {mockDriver.name}
          </p>
        </div>
        <div className="flex gap-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              onMouseEnter={() => setHoveredStar(star)}
              onMouseLeave={() => setHoveredStar(0)}
              onClick={() => setRating(star)}
              className="p-1 transition-transform hover:scale-110"
              aria-label={`Rate ${star} star${star > 1 ? "s" : ""}`}
            >
              <Star
                className={cn(
                  "h-8 w-8 transition-colors",
                  hoveredStar >= star || rating >= star
                    ? "fill-foreground text-foreground"
                    : "text-muted-foreground",
                )}
              />
            </button>
          ))}
        </div>
        <div className="bg-secondary flex items-center gap-2 rounded-lg px-4 py-2">
          <span className="text-muted-foreground text-sm">Trip fare:</span>
          <span className="text-foreground text-sm font-semibold">
            ${ride.basePrice.toFixed(2)}
          </span>
        </div>
        <button
          onClick={onComplete}
          className="bg-foreground text-background w-full rounded-lg py-3.5 text-sm font-semibold transition-opacity hover:opacity-90"
        >
          Done
        </button>
      </div>
    );
  }

  return (
    <div className="bg-background flex flex-col">
      {/* Status bar */}
      <div className="border-border border-b px-4 py-3">
        {status === "matching" && (
          <div className="flex items-center gap-3">
            <div className="relative h-5 w-5">
              <div className="bg-foreground/30 absolute inset-0 animate-ping rounded-full" />
              <div className="bg-foreground absolute inset-1 rounded-full" />
            </div>
            <div>
              <p className="text-foreground text-sm font-semibold">
                Looking for your driver...
              </p>
              <p className="text-muted-foreground text-xs">
                Finding nearby {ride.name} drivers
              </p>
            </div>
          </div>
        )}
        {status === "arriving" && (
          <div className="flex items-center justify-between">
            <div>
              <p className="text-foreground text-sm font-semibold">
                {mockDriver.name} is on the way
              </p>
              <p className="text-muted-foreground text-xs">
                Arriving in {eta} min &middot; {mockDriver.vehicle}
              </p>
            </div>
            <div className="text-right">
              <p className="text-foreground text-2xl font-bold">{eta}</p>
              <p className="text-muted-foreground text-[10px] uppercase">min</p>
            </div>
          </div>
        )}
        {status === "in-ride" && (
          <div className="flex items-center justify-between">
            <div>
              <p className="text-foreground text-sm font-semibold">
                Heading to destination
              </p>
              <p className="text-muted-foreground max-w-[200px] truncate text-xs">
                {destination}
              </p>
            </div>
            <div className="text-right">
              <p className="text-foreground text-2xl font-bold">{rideEta}</p>
              <p className="text-muted-foreground text-[10px] uppercase">min</p>
            </div>
          </div>
        )}

        {/* Progress bar */}
        {status !== "matching" && (
          <div className="bg-secondary mt-3 h-1 w-full overflow-hidden rounded-full">
            <div
              className="bg-foreground h-full rounded-full transition-all duration-1000"
              style={{
                width:
                  status === "arriving"
                    ? `${((mockDriver.eta - eta) / mockDriver.eta) * 100}%`
                    : `${((18 - rideEta) / 18) * 100}%`,
              }}
            />
          </div>
        )}
      </div>

      {/* Driver info */}
      {status !== "matching" && (
        <div className="border-border border-b px-4 py-3">
          <div className="flex items-center gap-3">
            <div className="bg-secondary text-foreground flex h-12 w-12 items-center justify-center rounded-full text-sm font-bold">
              {mockDriver.avatarInitials}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="text-foreground text-sm font-semibold">
                  {mockDriver.name}
                </span>
                <div className="flex items-center gap-0.5">
                  <Star className="fill-foreground text-foreground h-3 w-3" />
                  <span className="text-foreground text-xs">
                    {mockDriver.rating}
                  </span>
                </div>
              </div>
              <p className="text-muted-foreground text-xs">
                {mockDriver.vehicle} &middot; {mockDriver.licensePlate}
              </p>
            </div>
            <div className="flex gap-2">
              <button
                className="bg-secondary hover:bg-accent flex h-10 w-10 items-center justify-center rounded-full transition-colors"
                aria-label="Call driver"
              >
                <Phone className="text-foreground h-4 w-4" />
              </button>
              <button
                className="bg-secondary hover:bg-accent flex h-10 w-10 items-center justify-center rounded-full transition-colors"
                aria-label="Message driver"
              >
                <MessageSquare className="text-foreground h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Quick actions */}
      <div className="flex items-center justify-around px-4 py-3">
        <button className="flex flex-col items-center gap-1.5 p-2">
          <div className="bg-secondary flex h-10 w-10 items-center justify-center rounded-full">
            <Shield className="text-foreground h-4 w-4" />
          </div>
          <span className="text-muted-foreground text-[10px]">Safety</span>
        </button>
        <button className="flex flex-col items-center gap-1.5 p-2">
          <div className="bg-secondary flex h-10 w-10 items-center justify-center rounded-full">
            <Share2 className="text-foreground h-4 w-4" />
          </div>
          <span className="text-muted-foreground text-[10px]">Share trip</span>
        </button>
        <button className="flex flex-col items-center gap-1.5 p-2">
          <div className="bg-secondary flex h-10 w-10 items-center justify-center rounded-full">
            <Navigation className="text-foreground h-4 w-4" />
          </div>
          <span className="text-muted-foreground text-[10px]">Navigate</span>
        </button>
        {status !== "in-ride" && (
          <button
            onClick={onComplete}
            className="flex flex-col items-center gap-1.5 p-2"
          >
            <div className="bg-destructive/15 flex h-10 w-10 items-center justify-center rounded-full">
              <X className="text-destructive h-4 w-4" />
            </div>
            <span className="text-muted-foreground text-[10px]">Cancel</span>
          </button>
        )}
      </div>
    </div>
  );
}
