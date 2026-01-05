import { Card } from "~/components/ui/card"
import { Button } from "~/components/ui/button"
import { ThumbsUp, MessageCircle, MoreHorizontal } from "lucide-react"
import Image from "next/image"

interface Activity {
  id: string
  user: string
  userInitial: string
  type: string
  title: string
  time: string
  distance: string
  duration: string
  pace: string
  elevation: string
  kudos: number
  comments: number
  image?: string
}

export function ActivityCard({ activity }: { activity: Activity }) {
  return (
    <Card className="overflow-hidden">
      <div className="p-4 sm:p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
              <span className="text-sm font-medium text-primary">{activity.userInitial}</span>
            </div>
            <div>
              <div className="font-semibold">{activity.user}</div>
              <div className="text-sm text-muted-foreground">{activity.time}</div>
            </div>
          </div>
          <Button variant="ghost" size="icon">
            <MoreHorizontal className="h-5 w-5" />
          </Button>
        </div>

        <div className="mb-4">
          <h3 className="font-semibold text-lg mb-1">{activity.title}</h3>
          <div className="text-sm text-muted-foreground">{activity.type}</div>
        </div>

        {activity.image && (
          <div className="relative w-full aspect-[2/1] mb-4 rounded-lg overflow-hidden bg-muted">
            <Image src={activity.image || "/placeholder.svg"} alt={activity.title} fill className="object-cover" />
          </div>
        )}

        <div className="grid grid-cols-4 gap-4 py-4 border-t border-b">
          <div>
            <div className="text-xs text-muted-foreground mb-1">Distance</div>
            <div className="font-semibold">{activity.distance}</div>
          </div>
          <div>
            <div className="text-xs text-muted-foreground mb-1">Duration</div>
            <div className="font-semibold">{activity.duration}</div>
          </div>
          <div>
            <div className="text-xs text-muted-foreground mb-1">Pace</div>
            <div className="font-semibold">{activity.pace}</div>
          </div>
          <div>
            <div className="text-xs text-muted-foreground mb-1">Elevation</div>
            <div className="font-semibold">{activity.elevation}</div>
          </div>
        </div>

        <div className="flex items-center gap-4 mt-4">
          <Button variant="ghost" size="sm" className="gap-2">
            <ThumbsUp className="h-4 w-4" />
            <span>{activity.kudos}</span>
          </Button>
          <Button variant="ghost" size="sm" className="gap-2">
            <MessageCircle className="h-4 w-4" />
            <span>{activity.comments}</span>
          </Button>
        </div>
      </div>
    </Card>
  )
}
