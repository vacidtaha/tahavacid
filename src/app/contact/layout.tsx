import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact - Taha Vacid",
  description: "Up",
  keywords: "Taha Vacid, Contact, Communication, Collaboration",
  authors: [{ name: "Taha Vacid" }],
  creator: "Taha Vacid",
  metadataBase: new URL('https://contact.tahavacid.com'),
  openGraph: {
    title: "Contact - Taha Vacid",
    description: "Up",
    url: "https://contact.tahavacid.com",
    siteName: "Taha Vacid",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact - Taha Vacid",
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

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
} 