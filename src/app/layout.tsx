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
  title: "Tahavacid - R&D",
  description: "Tahavacid comprehensive web project",
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
