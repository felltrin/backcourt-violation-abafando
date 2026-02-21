"use client";

import { Home, Clock, User } from "lucide-react";
import { cn } from "~/lib/utils";

interface BottomNavProps {
  activeTab: "home" | "activity" | "account";
  onTabChange: (tab: "home" | "activity" | "account") => void;
}

export function BottomNav({ activeTab, onTabChange }: BottomNavProps) {
  const tabs = [
    { id: "home" as const, label: "Home", icon: Home },
    { id: "activity" as const, label: "Activity", icon: Clock },
    { id: "account" as const, label: "Account", icon: User },
  ];

  return (
    <nav
      className="border-border bg-background flex items-center justify-around border-t px-2 pt-2 pb-6"
      role="tablist"
      aria-label="Main navigation"
    >
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            role="tab"
            aria-selected={isActive}
            onClick={() => onTabChange(tab.id)}
            className={cn(
              "flex flex-col items-center gap-1 rounded-lg px-5 py-2 transition-colors",
              isActive
                ? "text-foreground"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            <Icon className="h-5 w-5" strokeWidth={isActive ? 2.5 : 1.5} />
            <span className="text-[10px] font-medium">{tab.label}</span>
          </button>
        );
      })}
    </nav>
  );
}
