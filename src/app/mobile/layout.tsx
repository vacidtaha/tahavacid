import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mobil Sayfa",
  description: "Mobil için özel tasarım sayfası",
};

export default function MobileLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="mobile-layout">
      {children}
    </div>
  );
} 