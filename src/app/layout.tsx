import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/themes/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { OnlineToast } from "@/components/network/OnlineToast";
import { OfflineOverlay } from "@/components/network/OfflineOverlay";
import CopyListenerClient from "@/hooks/useCopyListener";
import SpaceBackground from "@/themes/space-background";

export const metadata: Metadata = {
  title: {
    default: "Marsera – Mars Weather Dashboard by AjayInsane",
    template: "%s | Marsera",
  },
  description:
    "Marsera is a futuristic and immersive dashboard for visualizing live and simulated Mars weather data. Built with real NASA data for Cosmos Hackathon MUJ by AjayInsane.",
  applicationName: "Marsera",
  keywords: [
    "Marsera",
    "Mars Weather Dashboard",
    "Mars temperature",
    "Mars wind speed",
    "Martian climate",
    "NASA Mars data",
    "Mars mission visualization",
    "planetary science",
    "real-time space data",
    "Mars exploration",
    "sol tracker",
    "AjayInsane",
    "Cosmos Hackathon",
    "space dashboard",
    "Mars atmosphere"
  ],
  category: "science",
  metadataBase: new URL('https://mars.ajaypawar.com'),
  manifest: 'https://mars.ajaypawar.com/manifest.webmanifest',

  alternates: {
    canonical: "/",
  },

  twitter: {
    card: "summary_large_image",
    title: "Marsera – Real-Time Mars Weather Visualization",
    description:
      "Experience live and simulated Martian climate conditions in a beautifully designed dashboard powered by NASA data. Built for Cosmos Hackathon by AjayInsane.",
    site: "@AjayPawarExist",
  },

  openGraph: {
    title: "Marsera – Mars Weather Dashboard",
    description:
      "A scientifically inspired, visually stunning dashboard that brings Mars weather data to life. Explore Martian climate with Marsera – built by AjayInsane.",
    url: 'https://mars.ajaypawar.com',
    siteName: "Marsera",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: 'https://mars.ajaypawar.com/og-image.png',
        width: 1200,
        height: 630,
        alt: "Marsera – Mars Weather Dashboard",
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
    title: "Marsera",
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
      package: "com.ajayinsane.marsera",
      app_name: "Marsera",
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
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
        <OnlineToast />
        <OfflineOverlay />
        <CopyListenerClient />
        <SpaceBackground />
          <main className="relative z-10">
            {children}
          </main>
          <Toaster richColors/>
        </ThemeProvider>
      </body>
    </html>
  );
}
