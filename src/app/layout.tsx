import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import { NavBar } from "@/components/ui/tubelight-navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Taha Vacid",
  description: "Up",
  keywords: "Tahavacid, Taha Vacid, Poetry, R&D, Research, Development, Invictus, Personal Website",
  authors: [{ name: "Taha Vacid" }],
  creator: "Taha Vacid",
  metadataBase: new URL('https://tahavacid.com'),
  openGraph: {
    title: "Taha Vacid",
    description: "Up",
    url: "https://tahavacid.com",
    siteName: "Taha Vacid",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Taha Vacid",
    description: "Up",
    creator: "@tahavacid"
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

// Navbar menü öğeleri
const navItems = [
  { name: "Home", url: "/", icon: "Home" },
  { name: "R&D", url: "/research-development", icon: "FolderOpen" },
  { name: "Contact", url: "/contact", icon: "Mail" },
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <head>
        {/* Preload kritik resimler - sayfa geçişlerinde hızlı yükleme için */}
        <link rel="preload" href="/fil.png" as="image" type="image/png" />
        <link rel="preload" href="/neuron.jpg" as="image" type="image/jpeg" />
        <link rel="preload" href="/logo.svg" as="image" type="image/svg+xml" />
        
        {/* DNS prefetch - external resources için */}
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//fonts.gstatic.com" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Header />
        <main className="pt-16">
          {children}
        </main>
        <NavBar items={navItems} />
      </body>
    </html>
  );
}
