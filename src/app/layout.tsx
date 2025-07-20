import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { OnlineToast } from "@/components/network/OnlineToast";
import { OfflineOverlay } from "@/components/network/OfflineOverlay";
import CopyListenerClient from "@/hooks/useCopyListener";
import Star from "@/components/ui/star";

export const metadata: Metadata = {
  title: {
    default: "Mars Weather – Explore the Red Planet | AjayInsane",
    template: "%s | Mars Weather Dashboard",
  },
  description:
    "A visually immersive dashboard that simulates and visualizes Mars weather conditions using real NASA data. Built for Cosmos Hackathon MUJ by AjayInsane.",
  applicationName: "Mars Weather Dashboard",
  keywords: [
    "Mars Weather",
    "Mars dashboard",
    "NASA Mars data",
    "Mars temperature",
    "Mars wind speed",
    "space mission data",
    "planetary science",
    "AjayInsane",
    "Mars visualization",
    "hackathon project",
    "Mars exploration",
    "sol tracker",
    "Martian climate",
    "data storytelling",
  ],
  category: "science",
  metadataBase: new URL('https://mars.ajaypawar.com'),
  manifest: 'https://mars.ajaypawar.com/manifest.webmanifest',

  alternates: {
    canonical: "/",
  },

  twitter: {
    card: "summary_large_image",
    title: "Mars Weather – Visually Explore the Red Planet",
    description:
      "Built for Cosmos Hackathon, this dashboard showcases real and simulated Mars weather data in a beautiful, animated UI.",
    site: "@AjayPawarExist",
  },

  openGraph: {
    title: "Mars Weather Dashboard – Simulate & Visualize Martian Climate",
    description:
      "A cutting-edge scientific dashboard visualizing Mars weather using real NASA data. Built by AjayInsane for Cosmos Hackathon MUJ.",
    url: 'https://mars.ajaypawar.com',
    siteName: "Mars Weather Dashboard",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: 'https://mars.ajaypawar.com/og-image.png', 
        width: 1200,
        height: 630,
        alt: "Mars Weather – Cosmos Hackathon Project",
      },
    ],
  },

  icons: {
    icon: "/icon.png",
    shortcut: "/icon.png",
    apple: "/apple-icon.png",
    other: {
      rel: "icon",
      url: "/icon.png",
    },
  },

  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Mars Weather",
    startupImage: [
      {
        url: "/icon.png",
        media:
          "(device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3)",
      },
    ],
  },

  appLinks: {
    ios: {
      url: `https://mars.ajaypawar.com`,
    },
    android: {
      package: "com.ajayinsane.mars",
      app_name: "Mars Weather Dashboard",
    },
    web: {
      url: `https://mars.ajaypawar.com`,
      should_fallback: true,
    },
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <OnlineToast />
        <OfflineOverlay />
        <CopyListenerClient />
        <Star/>
        <main className="relative z-10">
          {children}
        </main>
        <Toaster richColors/>
      </body>
    </html>
  );
}
