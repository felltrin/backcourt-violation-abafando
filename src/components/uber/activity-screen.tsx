"use client";

import { useState } from "react";
import {
  Car,
  MapPin,
  ChevronRight,
  Calendar,
  ArrowUpDown,
  XCircle,
  CheckCircle2,
} from "lucide-react";
import { rideHistory } from "~/lib/mock-data";
import { cn } from "~/lib/utils";

export function ActivityScreen() {
  const [filter, setFilter] = useState<"all" | "completed" | "cancelled">(
    "all",
  );

  const filteredRides = rideHistory.filter((ride) => {
    if (filter === "all") return true;
    return ride.status === filter;
  });

  return (
    <div className="bg-background flex h-full flex-col">
      {/* Header */}
      <div className="border-border border-b px-4 pt-6 pb-4">
        <h1 className="text-foreground text-2xl font-bold">Your Trips</h1>
        <p className="text-muted-foreground text-sm">
          {rideHistory.length} rides total
        </p>
      </div>

      {/* Filter tabs */}
      <div className="border-border flex gap-2 border-b px-4 py-3">
        {(["all", "completed", "cancelled"] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={cn(
              "rounded-full px-4 py-1.5 text-xs font-medium capitalize transition-colors",
              filter === f
                ? "bg-foreground text-background"
                : "bg-secondary text-foreground hover:bg-accent",
            )}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Ride list */}
      <div className="flex-1 overflow-y-auto">
        {filteredRides.map((ride, i) => (
          <button
            key={ride.id}
            className={cn(
              "hover:bg-secondary/30 flex w-full items-start gap-3 px-4 py-4 text-left transition-colors",
              i < filteredRides.length - 1 && "border-border/50 border-b",
            )}
          >
            <div
              className={cn(
                "mt-0.5 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg",
                ride.status === "completed"
                  ? "bg-secondary"
                  : "bg-destructive/10",
              )}
            >
              <Car
                className={cn(
                  "h-5 w-5",
                  ride.status === "completed"
                    ? "text-foreground"
                    : "text-destructive",
                )}
              />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between">
                <span className="text-foreground text-sm font-semibold">
                  {ride.vehicleType}
                </span>
                <span
                  className={cn(
                    "text-sm font-semibold",
                    ride.status === "completed"
                      ? "text-foreground"
                      : "text-destructive",
                  )}
                >
                  {ride.price}
                </span>
              </div>
              <div className="mt-1 flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <div className="bg-foreground h-1.5 w-1.5 rounded-full" />
                  <span className="text-muted-foreground truncate text-xs">
                    {ride.pickup}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="bg-muted-foreground h-1.5 w-1.5 rounded-full" />
                  <span className="text-muted-foreground truncate text-xs">
                    {ride.dropoff}
                  </span>
                </div>
              </div>
              <div className="mt-2 flex items-center gap-3">
                <div className="flex items-center gap-1">
                  <Calendar className="text-muted-foreground h-3 w-3" />
                  <span className="text-muted-foreground text-[10px]">
                    {ride.date}
                  </span>
                </div>
                {ride.status === "completed" && (
                  <>
                    <div className="flex items-center gap-1">
                      <ArrowUpDown className="text-muted-foreground h-3 w-3" />
                      <span className="text-muted-foreground text-[10px]">
                        {ride.distance}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <CheckCircle2 className="text-uber-green h-3 w-3" />
                      <span className="text-muted-foreground text-[10px]">
                        {ride.duration}
                      </span>
                    </div>
                  </>
                )}
                {ride.status === "cancelled" && (
                  <div className="flex items-center gap-1">
                    <XCircle className="text-destructive h-3 w-3" />
                    <span className="text-destructive text-[10px]">
                      Cancelled
                    </span>
                  </div>
                )}
              </div>
            </div>
            <ChevronRight className="text-muted-foreground mt-2 h-4 w-4 flex-shrink-0" />
          </button>
        ))}
        {filteredRides.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16">
            <MapPin className="text-muted-foreground mb-3 h-10 w-10" />
            <p className="text-foreground text-sm font-medium">
              No trips found
            </p>
            <p className="text-muted-foreground text-xs">
              No {filter} rides to display
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
