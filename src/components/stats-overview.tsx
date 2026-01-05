import { Card } from "~/components/ui/card"
import { TrendingUp } from "lucide-react"

export function StatsOverview() {
  const stats = [
    { label: "Distance", value: "124.8", unit: "km", trend: "+12%" },
    { label: "Time", value: "12h 45m", trend: "+8%" },
    { label: "Activities", value: "18", trend: "+5%" },
    { label: "Elevation", value: "2,840", unit: "m", trend: "+15%" },
  ]

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <Card key={stat.label} className="p-4">
          <div className="text-sm text-muted-foreground mb-1">{stat.label}</div>
          <div className="flex items-baseline gap-1 mb-2">
            <span className="text-2xl font-bold">{stat.value}</span>
            {stat.unit && <span className="text-sm text-muted-foreground">{stat.unit}</span>}
          </div>
          <div className="flex items-center gap-1 text-sm text-primary">
            <TrendingUp className="h-3 w-3" />
            <span className="font-medium">{stat.trend}</span>
            <span className="text-muted-foreground">this month</span>
          </div>
        </Card>
      ))}
    </div>
  )
}
