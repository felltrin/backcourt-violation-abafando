"use client";

import {
  ChevronRight,
  CreditCard,
  Gift,
  HelpCircle,
  Home,
  Briefcase,
  Settings,
  Shield,
  Star,
  Bell,
  FileText,
  LogOut,
} from "lucide-react";
import { cn } from "~/lib/utils";

interface MenuItemProps {
  icon: React.ReactNode;
  label: string;
  subtitle?: string;
  onClick?: () => void;
  danger?: boolean;
}

function MenuItem({ icon, label, subtitle, onClick, danger }: MenuItemProps) {
  return (
    <button
      onClick={onClick}
      className="hover:bg-secondary/50 flex w-full items-center gap-4 px-4 py-3.5 text-left transition-colors"
    >
      <div className="bg-secondary flex h-9 w-9 items-center justify-center rounded-full">
        {icon}
      </div>
      <div className="flex-1">
        <p
          className={cn(
            "text-sm font-medium",
            danger ? "text-destructive" : "text-foreground",
          )}
        >
          {label}
        </p>
        {subtitle && (
          <p className="text-muted-foreground text-xs">{subtitle}</p>
        )}
      </div>
      <ChevronRight className="text-muted-foreground h-4 w-4" />
    </button>
  );
}

export function AccountScreen() {
  return (
    <div className="bg-background flex h-full flex-col overflow-y-auto">
      {/* Profile header */}
      <div className="border-border flex items-center gap-4 border-b px-4 pt-6 pb-5">
        <div className="bg-secondary text-foreground flex h-16 w-16 items-center justify-center rounded-full text-lg font-bold">
          AJ
        </div>
        <div className="flex-1">
          <h1 className="text-foreground text-xl font-bold">Alex Johnson</h1>
          <div className="mt-0.5 flex items-center gap-2">
            <Star className="fill-foreground text-foreground h-3.5 w-3.5" />
            <span className="text-muted-foreground text-sm">4.88 rating</span>
          </div>
        </div>
        <ChevronRight className="text-muted-foreground h-5 w-5" />
      </div>

      {/* Quick Stats */}
      <div className="border-border flex border-b">
        <div className="border-border flex flex-1 flex-col items-center border-r py-4">
          <span className="text-foreground text-2xl font-bold">142</span>
          <span className="text-muted-foreground text-xs">Rides</span>
        </div>
        <div className="border-border flex flex-1 flex-col items-center border-r py-4">
          <span className="text-foreground text-2xl font-bold">$2.4k</span>
          <span className="text-muted-foreground text-xs">Spent</span>
        </div>
        <div className="flex flex-1 flex-col items-center py-4">
          <span className="text-foreground text-2xl font-bold">3</span>
          <span className="text-muted-foreground text-xs">Promos</span>
        </div>
      </div>

      {/* Menu sections */}
      <div className="border-border border-b py-2">
        <p className="text-muted-foreground px-4 py-2 text-xs font-semibold tracking-wider uppercase">
          Saved Places
        </p>
        <MenuItem
          icon={<Home className="text-foreground h-4 w-4" />}
          label="Home"
          subtitle="742 Evergreen Terrace, Springfield"
        />
        <MenuItem
          icon={<Briefcase className="text-foreground h-4 w-4" />}
          label="Work"
          subtitle="1600 Amphitheatre Pkwy, Mountain View"
        />
      </div>

      <div className="border-border border-b py-2">
        <p className="text-muted-foreground px-4 py-2 text-xs font-semibold tracking-wider uppercase">
          Account
        </p>
        <MenuItem
          icon={<CreditCard className="text-foreground h-4 w-4" />}
          label="Payment"
          subtitle="Visa **** 4242"
        />
        <MenuItem
          icon={<Gift className="text-foreground h-4 w-4" />}
          label="Promotions"
          subtitle="3 available"
        />
        <MenuItem
          icon={<Bell className="text-foreground h-4 w-4" />}
          label="Notifications"
        />
      </div>

      <div className="border-border border-b py-2">
        <p className="text-muted-foreground px-4 py-2 text-xs font-semibold tracking-wider uppercase">
          Support
        </p>
        <MenuItem
          icon={<Shield className="text-foreground h-4 w-4" />}
          label="Safety"
          subtitle="Emergency contacts & safety tools"
        />
        <MenuItem
          icon={<HelpCircle className="text-foreground h-4 w-4" />}
          label="Help"
        />
        <MenuItem
          icon={<FileText className="text-foreground h-4 w-4" />}
          label="Legal"
        />
      </div>

      <div className="py-2">
        <MenuItem
          icon={<Settings className="text-foreground h-4 w-4" />}
          label="Settings"
        />
        <MenuItem
          icon={<LogOut className="text-destructive h-4 w-4" />}
          label="Sign Out"
          danger
        />
      </div>

      {/* App version */}
      <div className="px-4 py-4">
        <p className="text-muted-foreground text-center text-[10px]">
          v24.10.1 &middot; San Francisco, CA
        </p>
      </div>
    </div>
  );
}
