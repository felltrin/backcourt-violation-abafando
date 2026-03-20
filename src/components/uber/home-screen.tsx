import {
  Search,
  Home,
  Briefcase,
  Star,
  ChevronRight,
  MapPin,
} from "lucide-react";
import { useEffect, useState } from "react";
import { recentLocations, promotions } from "~/lib/mock-data";
import { cn } from "~/lib/utils";
import type { SavedPlace } from "~/server/graphql/types";

interface HomeScreenProps {
  onSearchClick: () => void;
  onLocationSelect: (name: string, address: string) => void;
}

const GQL_ENDPOINT = "http://localhost:3000/api/graphql";

const myQuery = `
  query GetSavedPlaces {
    savedPlaces {
      id
      name
      address
      icon
    }
  }
`;

const savedPlaceIcons = {
  home: Home,
  briefcase: Briefcase,
  star: Star,
};

export function HomeScreen({
  onSearchClick,
  onLocationSelect,
}: HomeScreenProps) {
  const [savedPlaces, setSavedPlaces] = useState<SavedPlace[]>([]);

  // auth session check

  useEffect(() => {
    async function graphqlQuery(query: string, variables = {}) {
      const response = await fetch(GQL_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          // Add authentication headers if needed, e.g.,
          // 'Authorization': 'Bearer YOUR_TOKEN',
        },
        body: JSON.stringify({
          query: query,
          variables: variables,
        }),
      });

      const result = await response.json();
      setSavedPlaces(result.data.savedPlaces);
      for (let i = 0; i < savedPlaces.length; i++) {
        console.log(savedPlaces[i]);
      }
    }

    graphqlQuery(myQuery);
  }, []);

  return (
    <div className="flex flex-col gap-4 p-4">
      {/* Search bar */}
      <button
        onClick={onSearchClick}
        className="bg-secondary hover:bg-accent flex items-center gap-3 rounded-lg px-4 py-3.5 text-left transition-colors"
      >
        <Search className="text-muted-foreground h-5 w-5" />
        <span className="text-muted-foreground text-[15px]">Where to?</span>
        <div className="bg-background ml-auto flex items-center gap-2 rounded-full px-3 py-1.5">
          <div className="bg-foreground h-1.5 w-1.5 rounded-full" />
          <span className="text-foreground text-xs font-medium">Now</span>
          <ChevronRight className="text-muted-foreground h-3.5 w-3.5" />
        </div>
      </button>

      {/* Saved places */}
      <div className="scrollbar-hide flex gap-3 overflow-x-auto pb-1">
        {savedPlaces.map((place) => {
          const Icon = savedPlaceIcons[place.icon];
          return (
            <button
              key={place.id}
              onClick={() => onLocationSelect(place.name, place.address)}
              className="bg-secondary hover:bg-accent flex flex-shrink-0 items-center gap-2.5 rounded-full px-4 py-2.5 transition-colors"
            >
              <Icon className="text-foreground h-4 w-4" />
              <span className="text-foreground text-sm font-medium">
                {place.name}
              </span>
            </button>
          );
        })}
      </div>

      {/* Promotions */}
      <div className="scrollbar-hide flex gap-3 overflow-x-auto pb-1">
        {promotions.map((promo) => (
          <div
            key={promo.id}
            className="bg-secondary flex min-w-[200px] flex-shrink-0 flex-col gap-1.5 rounded-xl p-4"
          >
            <div className="flex items-center gap-2">
              <div className="bg-uber-green/15 flex h-8 w-8 items-center justify-center rounded-full">
                <span className="text-uber-green text-xs font-bold">
                  {promo.discount}
                </span>
              </div>
              <span className="text-foreground text-sm font-semibold">
                {promo.title}
              </span>
            </div>
            <p className="text-muted-foreground text-xs">{promo.description}</p>
          </div>
        ))}
      </div>

      {/* Suggestions / Recent */}
      <div>
        <h3 className="text-foreground mb-2 text-sm font-semibold">
          Suggestions
        </h3>
        <div className="flex flex-col">
          {recentLocations.slice(0, 4).map((loc, i) => (
            <button
              key={loc.id}
              onClick={() => onLocationSelect(loc.name, loc.address)}
              className={cn(
                "hover:bg-secondary/50 -mx-2 flex items-center gap-3 rounded-lg px-2 py-3.5 text-left transition-colors",
                i < 3 && "border-border border-b",
              )}
            >
              <div className="bg-secondary flex h-9 w-9 items-center justify-center rounded-full">
                <MapPin className="text-muted-foreground h-4 w-4" />
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
      </div>
    </div>
  );
}
