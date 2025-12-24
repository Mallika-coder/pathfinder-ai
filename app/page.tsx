// // app/page.tsx me ye changes karein:
// import MapDashboard from "../components/MapDashboard";
// import SentinelUpload from "../components/SentinelUpload";
// import AnalyticsPanel from "../components/AnalyticsPanel";

// export default function Home() {
//   return (
//     <main className="w-full h-screen flex flex-col lg:flex-row">
//       {/* Sidebar */}
//       <aside className="w-full lg:w-80 bg-crisis-panel p-4 lg:p-6 space-y-6 overflow-y-auto">
//         <div className="text-center lg:text-left">
//           <h1 className="text-2xl lg:text-3xl font-bold text-white mb-2">
//             PathFinder AI
//           </h1>
//           <p className="text-sm text-slate-400">
//             Emergency Navigation System
//           </p>
//         </div>
        
//         <SentinelUpload />
//         <AnalyticsPanel />
        
//         <div className="text-xs text-slate-500 text-center lg:text-left">
//           <p>Powered by Google Gemini AI</p>
//           <p>© 2025 PathFinder AI</p>
//         </div>
//       </aside>

//       {/* Map */}
//       <section className="flex-1 relative">
//         <MapDashboard />
        
//         {/* Mobile overlay hint */}
//         <div className="lg:hidden absolute top-4 left-4 bg-crisis-panel/90 backdrop-blur px-3 py-2 rounded-lg">
//           <p className="text-xs text-white">Tap markers for details</p>
//         </div>
//       </section>
//     </main>
//   );
// }

import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center px-6">
      <div className="max-w-3xl text-center space-y-8">
        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight">
          PathFinder AI
        </h1>

        <p className="text-xl text-slate-400">
          Mapping the Unmapped. Saving the Unseen.
        </p>

        <p className="text-slate-300">
          AI-powered emergency navigation for informal settlements where
          traditional GPS fails.
        </p>

        <div className="flex justify-center gap-6 pt-6">
          <Link
            href="/sentinel"
            className="px-6 py-3 rounded-xl bg-red-600 hover:bg-red-700 font-semibold"
          >
            🚨 Report Blockage
          </Link>


          <Link
            href="/dashboard"
            className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 font-semibold"
          >
            🚑 Responder Dashboard
          </Link>
        </div>
      </div>
    </main>
  );
}
