import type React from "react";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import Link from "next/link";

import "../styles/globals.css";

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "TrackFit - Your Fitness Journey",
  description: "Track your runs, rides, and workouts with TrackFit",
  generator: "v0.app",
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body>
        {/* <nav className="border-b p-4">
          <div className="container mx-auto flex gap-4">
            <Link href="/" className="font-bold">
              Home
            </Link>
            <Link href="/docs" className="hover:underline">
              Documentation
            </Link>
            <Link href="/api/graphql" className="hover:underline">
              GraphQL Playground
            </Link>
          </div>
        </nav> */}
        {children}
      </body>
    </html>
  );
}
