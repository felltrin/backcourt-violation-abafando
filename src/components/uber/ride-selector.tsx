"use client";

import { useEffect, useState } from "react";
import {
  Car,
  CarFront,
  Crown,
  Users,
  Zap,
  ChevronDown,
  CreditCard,
  Clock,
} from "lucide-react";
import { cn } from "~/lib/utils";
import { type RideType } from "~/lib/mock-data";
import { graphqlRequest, queries } from "~/lib/graphql-client";

interface RideSelectorProps {
  destination: string;
  onConfirm: (ride: RideType) => void;
  onBack: () => void;
}

interface ResultType {
  rideTypes: RideType[];
}

const rideIcons = {
  car: Car,
  "car-front": CarFront,
  crown: Crown,
  users: Users,
  zap: Zap,
};

export function RideSelector({
  destination,
  onConfirm,
  onBack,
}: RideSelectorProps) {
  const [selectedRide, setSelectedRide] = useState<string>("uberx");
  const [rideTypes, setRideTypes] = useState<RideType[]>([]);

  useEffect(() => {
    const fetchRideTypes = async () => {
      try {
        const result = await graphqlRequest<ResultType>(queries.GET_RIDETYPES);
        setRideTypes(result.rideTypes);
      } catch (error) {
        console.error("There has been an error fetching the data: ", error);
      }
    };

    void fetchRideTypes();
  }, []);

  const selected = rideTypes.find((r) => r.id === selectedRide) ?? rideTypes[0];

  if (!selected) {
    return <div>No ride selected!</div>;
  }

  return (
    <div className="bg-background flex flex-col">
      {/* Header */}
      <div className="border-border flex items-center justify-between border-b px-4 py-3">
        <div>
          <p className="text-muted-foreground text-xs">Going to</p>
          <p className="text-foreground max-w-[200px] truncate text-sm font-semibold">
            {destination}
          </p>
        </div>
        <button
          onClick={onBack}
          className="bg-secondary text-foreground hover:bg-accent rounded-full px-3 py-1.5 text-xs font-medium transition-colors"
        >
          Change
        </button>
      </div>

      {/* Ride options */}
      <div className="max-h-[280px] overflow-y-auto">
        {rideTypes.map((ride) => {
          const Icon = rideIcons[ride.icon];
          const isSelected = selectedRide === ride.id;
          return (
            <button
              key={ride.id}
              onClick={() => setSelectedRide(ride.id)}
              className={cn(
                "flex w-full items-center gap-3 px-4 py-3 text-left transition-all",
                isSelected ? "bg-secondary" : "hover:bg-secondary/30",
              )}
            >
              <div
                className={cn(
                  "flex h-12 w-12 items-center justify-center rounded-lg transition-colors",
                  isSelected ? "bg-foreground" : "bg-accent",
                )}
              >
                <Icon
                  className={cn(
                    "h-6 w-6",
                    isSelected ? "text-background" : "text-foreground",
                  )}
                />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-foreground text-sm font-semibold">
                    {ride.name}
                  </span>
                  <div className="text-muted-foreground flex items-center gap-1">
                    <Users className="h-3 w-3" />
                    <span className="text-xs">{ride.capacity}</span>
                  </div>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock className="text-muted-foreground h-3 w-3" />
                  <span className="text-muted-foreground text-xs">
                    {ride.eta} away
                  </span>
                  <span className="text-muted-foreground text-xs">
                    &middot; {ride.description}
                  </span>
                </div>
              </div>
              <span className="text-foreground text-sm font-semibold">
                ${ride.basePrice.toFixed(2)}
              </span>
            </button>
          );
        })}
      </div>

      {/* Payment & Confirm */}
      <div className="border-border border-t p-4">
        <div className="mb-3 flex items-center justify-between">
          <button className="hover:bg-secondary flex items-center gap-2 rounded-lg px-2 py-1 transition-colors">
            <CreditCard className="text-muted-foreground h-4 w-4" />
            <span className="text-foreground text-xs">
              {"Personal \u00b7 **** 4242"}
            </span>
            <ChevronDown className="text-muted-foreground h-3 w-3" />
          </button>
        </div>
        <button
          onClick={() => onConfirm(selected)}
          className="bg-foreground text-background w-full rounded-lg py-3.5 text-sm font-semibold transition-opacity hover:opacity-90 active:opacity-80"
        >
          Choose {selected.name} &middot; ${selected.basePrice.toFixed(2)}
        </button>
      </div>
    </div>
  );
}
