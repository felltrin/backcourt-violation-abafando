"use client";

import { useEffect, useState } from "react";
import { ArrowLeft, MapPin, Circle, Square, Clock, Star } from "lucide-react";
import { cn } from "~/lib/utils";
import { graphqlRequest, queries } from "~/lib/graphql-client";
import {
  type SearchSuggestion,
  type RecentLocation,
} from "~/server/graphql/types";

interface SearchPanelProps {
  onBack: () => void;
  onSelectDestination: (name: string, address: string) => void;
  initialPickup?: string;
}

interface SearchSuggestionsResult {
  searchSuggestions: SearchSuggestion[];
}

interface RecentLocationsResult {
  recentLocations: RecentLocation[];
}

export function SearchPanel({
  onBack,
  onSelectDestination,
  initialPickup,
}: SearchPanelProps) {
  const [pickup, setPickup] = useState(initialPickup ?? "Current Location");
  const [dropoff, setDropoff] = useState("");
  const [focusedField, setFocusedField] = useState<"pickup" | "dropoff">(
    "dropoff",
  );
  const [recentLocations, setRecentLocations] = useState<RecentLocation[]>([]);
  const [searchSuggestions, setSearchSuggestions] = useState<
    SearchSuggestion[]
  >([]);

  useEffect(() => {
    graphqlRequest<RecentLocationsResult>(queries.GET_RECENT_LOCATIONS).then(
      (result) => {
        setRecentLocations(result.recentLocations);
      },
    );
    graphqlRequest<SearchSuggestionsResult>(
      queries.GET_SEARCH_SUGGESTIONS,
    ).then((result) => {
      setSearchSuggestions(result.searchSuggestions);
    });
  }, []);

  const filteredLocations =
    dropoff.length > 0
      ? [...searchSuggestions, ...recentLocations].filter(
          (loc) =>
            loc.name.toLowerCase().includes(dropoff.toLowerCase()) ||
            loc.address.toLowerCase().includes(dropoff.toLowerCase()),
        )
      : recentLocations;

  return (
    <div className="bg-background flex h-full flex-col">
      {/* Header */}
      <div className="border-border flex items-center gap-3 border-b p-4">
        <button
          onClick={onBack}
          className="hover:bg-secondary flex h-9 w-9 items-center justify-center rounded-full transition-colors"
          aria-label="Go back"
        >
          <ArrowLeft className="text-foreground h-5 w-5" />
        </button>
        <div className="flex flex-1 flex-col gap-3">
          {/* Pickup */}
          <div className="flex items-center gap-3">
            <Circle
              className="text-foreground h-3 w-3 flex-shrink-0"
              fill="currentColor"
            />
            <input
              type="text"
              value={pickup}
              onChange={(e) => setPickup(e.target.value)}
              onFocus={() => setFocusedField("pickup")}
              placeholder="Pickup location"
              className={cn(
                "text-foreground placeholder:text-muted-foreground flex-1 bg-transparent text-sm font-medium outline-none",
                focusedField === "pickup" && "text-foreground",
              )}
            />
          </div>
          {/* Divider line */}
          <div className="border-muted-foreground ml-1.5 h-4 w-px border-l border-dashed" />
          {/* Dropoff */}
          <div className="flex items-center gap-3">
            <Square
              className="text-foreground h-3 w-3 flex-shrink-0"
              fill="currentColor"
            />
            <input
              type="text"
              value={dropoff}
              onChange={(e) => setDropoff(e.target.value)}
              onFocus={() => setFocusedField("dropoff")}
              placeholder="Where to?"
              autoFocus
              className={cn(
                "text-foreground placeholder:text-muted-foreground flex-1 bg-transparent text-sm font-medium outline-none",
                focusedField === "dropoff" && "text-foreground",
              )}
            />
          </div>
        </div>
      </div>

      {/* Location results */}
      <div className="flex-1 overflow-y-auto">
        {dropoff.length === 0 && (
          <div className="border-border border-b px-4 py-3">
            <p className="text-muted-foreground text-xs font-semibold tracking-wider uppercase">
              Recent
            </p>
          </div>
        )}
        <div className="flex flex-col">
          {filteredLocations.map((loc, i) => (
            <button
              key={loc.id}
              onClick={() => onSelectDestination(loc.name, loc.address)}
              className={cn(
                "hover:bg-secondary/50 flex items-center gap-3 px-4 py-3.5 text-left transition-colors",
                i < filteredLocations.length - 1 && "border-border/50 border-b",
              )}
            >
              <div className="bg-secondary flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full">
                {dropoff.length > 0 ? (
                  <MapPin className="text-muted-foreground h-4 w-4" />
                ) : (
                  <Clock className="text-muted-foreground h-4 w-4" />
                )}
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-foreground truncate text-sm font-medium">
                  {loc.name}
                </p>
                <p className="text-muted-foreground truncate text-xs">
                  {loc.address}
                </p>
              </div>
            </button>
          ))}
        </div>
        {filteredLocations.length === 0 && dropoff.length > 0 && (
          <div className="flex flex-col items-center justify-center px-4 py-12">
            <MapPin className="text-muted-foreground mb-3 h-8 w-8" />
            <p className="text-muted-foreground text-sm">No results found</p>
          </div>
        )}

        {/* Saved places shortcut */}
        {dropoff.length === 0 && (
          <div className="px-4 pt-4">
            <button className="bg-secondary hover:bg-accent flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left transition-colors">
              <Star className="text-muted-foreground h-4 w-4" />
              <span className="text-foreground text-sm font-medium">
                Saved Places
              </span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
