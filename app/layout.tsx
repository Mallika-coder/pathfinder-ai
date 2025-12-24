import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "PathFinder AI - Emergency Navigation System",
  description: "Real-time emergency navigation for informal settlements using AI and community reports",
  keywords: "emergency, navigation, AI, slums, ambulance, maps",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="bg-crisis-bg text-white min-h-screen">
        {children}
      </body>
    </html>
  );
}
