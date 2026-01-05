import { ActivityCard } from "~/components/activity-card"

const mockActivities = [
  {
    id: "1",
    user: "John Doe",
    userInitial: "JD",
    type: "Run",
    title: "Morning Trail Run",
    time: "2 hours ago",
    distance: "12.4 km",
    duration: "58:24",
    pace: "4:42 /km",
    elevation: "245 m",
    kudos: 24,
    comments: 5,
    image: "/mountain-trail-running-path-scenic-view.jpg",
  },
  {
    id: "2",
    user: "Sarah Chen",
    userInitial: "SC",
    type: "Ride",
    title: "Evening Bike Commute",
    time: "5 hours ago",
    distance: "18.2 km",
    duration: "42:15",
    pace: "25.8 km/h",
    elevation: "120 m",
    kudos: 18,
    comments: 3,
  },
  {
    id: "3",
    user: "Mike Johnson",
    userInitial: "MJ",
    type: "Run",
    title: "Speed Intervals",
    time: "8 hours ago",
    distance: "8.5 km",
    duration: "35:12",
    pace: "4:08 /km",
    elevation: "85 m",
    kudos: 32,
    comments: 7,
    image: "/running-track-sunset-athletic.jpg",
  },
  {
    id: "4",
    user: "Emma Wilson",
    userInitial: "EW",
    type: "Run",
    title: "Recovery Run",
    time: "12 hours ago",
    distance: "6.8 km",
    duration: "38:45",
    pace: "5:42 /km",
    elevation: "45 m",
    kudos: 15,
    comments: 2,
  },
  {
    id: "5",
    user: "Alex Martinez",
    userInitial: "AM",
    type: "Ride",
    title: "Weekend Long Ride",
    time: "1 day ago",
    distance: "64.3 km",
    duration: "2:45:30",
    pace: "23.3 km/h",
    elevation: "680 m",
    kudos: 42,
    comments: 12,
    image: "/cycling-road-scenic-mountains.jpg",
  },
]

export function ActivityFeed() {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Activity Feed</h2>
      {mockActivities.map((activity) => (
        <ActivityCard key={activity.id} activity={activity} />
      ))}
    </div>
  )
}
