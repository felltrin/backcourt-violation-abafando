// import { Header } from "~/components/header";
// import { StatsOverview } from "~/components/stats-overview";
// import { ActivityFeed } from "~/components/activity-feed";

// export default function Home() {
//   return (
//     <div className="bg-background min-h-screen">
//       <Header />
//       <main className="container mx-auto max-w-7xl px-4 py-6">
//         <div className="grid gap-6 lg:grid-cols-[1fr_380px]">
//           <div className="space-y-6">
//             <StatsOverview />
//             <ActivityFeed />
//           </div>
//           <aside className="hidden space-y-6 lg:block">
//             <div className="bg-card rounded-lg border p-6">
//               <h3 className="mb-4 text-lg font-semibold">Weekly Summary</h3>
//               <div className="space-y-4">
//                 <div>
//                   <div className="mb-1 flex justify-between text-sm">
//                     <span className="text-muted-foreground">Distance</span>
//                     <span className="font-medium">42.5 km</span>
//                   </div>
//                   <div className="bg-muted h-2 overflow-hidden rounded-full">
//                     <div className="bg-primary h-full w-3/4"></div>
//                   </div>
//                 </div>
//                 <div>
//                   <div className="mb-1 flex justify-between text-sm">
//                     <span className="text-muted-foreground">Time</span>
//                     <span className="font-medium">4h 15m</span>
//                   </div>
//                   <div className="bg-muted h-2 overflow-hidden rounded-full">
//                     <div className="bg-primary h-full w-2/3"></div>
//                   </div>
//                 </div>
//                 <div>
//                   <div className="mb-1 flex justify-between text-sm">
//                     <span className="text-muted-foreground">Activities</span>
//                     <span className="font-medium">6 of 7</span>
//                   </div>
//                   <div className="bg-muted h-2 overflow-hidden rounded-full">
//                     <div className="bg-primary h-full w-5/6"></div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//             <div className="bg-card rounded-lg border p-6">
//               <h3 className="mb-4 text-lg font-semibold">Following</h3>
//               <div className="space-y-3">
//                 {["Sarah Chen", "Mike Johnson", "Emma Wilson"].map((name) => (
//                   <div key={name} className="flex items-center gap-3">
//                     <div className="bg-primary/10 flex h-10 w-10 items-center justify-center rounded-full">
//                       <span className="text-primary text-sm font-medium">
//                         {name[0]}
//                       </span>
//                     </div>
//                     <div className="flex-1">
//                       <div className="text-sm font-medium">{name}</div>
//                       <div className="text-muted-foreground text-xs">
//                         Active today
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </aside>
//         </div>
//       </main>
//     </div>
//   );
// }

import Link from "next/link";

export default function Page() {
  return (
    <div>
      <h1>Home</h1>
      <Link href="/about">About</Link>
    </div>
  );
}
