import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Adarsh Razor | Portfolio",
  description: "Full-stack developer, hacker, and tech enthusiast. Exploring the intersection of technology, social engineering, and AI.",
  keywords: ["developer", "portfolio", "full-stack", "hacker", "tech", "AI", "social engineering"],
  authors: [{ name: "Adarsh Razor" }],
  creator: "Adarsh Razor",
  publisher: "Adarsh Razor",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://adarshere.vercel.app"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://adarshrazor.com",
    title: "Adarsh Razor | Portfolio",
    description: "Full-stack developer, hacker, and tech enthusiast. Exploring the intersection of technology, social engineering, and AI.",
    siteName: "Adarsh Razor Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Adarsh Razor | Portfolio",
    description: "Full-stack developer, hacker, and tech enthusiast. Exploring the intersection of technology, social engineering, and AI.",
    creator: "@adarshrazor",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
  },
  verification: {
    google: "your-google-site-verification",
  },
};
