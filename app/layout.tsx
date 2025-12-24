// import "./globals.css";
// import type { Metadata } from "next";

// export const metadata: Metadata = {
//   title: "PathFinder AI - Emergency Navigation System",
//   description: "Real-time emergency navigation for informal settlements using AI and community reports",
//   keywords: "emergency, navigation, AI, slums, ambulance, maps",
// };

// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   return (
//     <html lang="en" className="dark">
//       <body className="bg-crisis-bg text-white min-h-screen">
//         {children}
//       </body>
//     </html>
//   );
// }


"use client";

import { motion, AnimatePresence } from "framer-motion";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-[#020617] text-white">
        <AnimatePresence mode="wait">
          <motion.div
            key={Math.random()}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </body>
    </html>
  );
}
