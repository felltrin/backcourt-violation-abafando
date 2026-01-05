import { Header } from "~/components/header"
import { StatsOverview } from "~/components/stats-overview"
import { ActivityFeed } from "~/components/activity-feed"

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-6 max-w-7xl">
        <div className="grid lg:grid-cols-[1fr_380px] gap-6">
          <div className="space-y-6">
            <StatsOverview />
            <ActivityFeed />
          </div>
          <aside className="hidden lg:block space-y-6">
            <div className="bg-card rounded-lg border p-6">
              <h3 className="font-semibold text-lg mb-4">Weekly Summary</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-muted-foreground">Distance</span>
                    <span className="font-medium">42.5 km</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-primary w-3/4"></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-muted-foreground">Time</span>
                    <span className="font-medium">4h 15m</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-primary w-2/3"></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-muted-foreground">Activities</span>
                    <span className="font-medium">6 of 7</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-primary w-5/6"></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-card rounded-lg border p-6">
              <h3 className="font-semibold text-lg mb-4">Following</h3>
              <div className="space-y-3">
                {["Sarah Chen", "Mike Johnson", "Emma Wilson"].map((name) => (
                  <div key={name} className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                      <span className="text-sm font-medium text-primary">{name[0]}</span>
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-sm">{name}</div>
                      <div className="text-xs text-muted-foreground">Active today</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  )
}
