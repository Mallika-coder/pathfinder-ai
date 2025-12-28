
import Link from "next/link";
import { Shield, Navigation, Camera, ChevronRight, Activity, Map } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen bg-crisis-bg text-white relative overflow-hidden selection:bg-crisis-danger/30">

      {/* Dynamic Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[120px] mix-blend-screen animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-red-600/10 rounded-full blur-[120px] mix-blend-screen animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-20 pb-12 min-h-screen flex flex-col">

        {/* Header / Nav */}
        <nav className="flex justify-between items-center mb-16 animate-in slide-in-from-top-10 fade-in duration-700">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-crisis-danger to-red-700 rounded-xl flex items-center justify-center shadow-lg shadow-crisis-danger/20">
              <Navigation className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold tracking-tight">PathFinder<span className="text-crisis-danger">AI</span></span>
          </div>

          <div className="flex items-center gap-2 px-4 py-2 bg-slate-800/40 backdrop-blur-md rounded-full border border-slate-700/50">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-xs font-semibold text-emerald-400 tracking-wide uppercase">System Operational</span>
          </div>
        </nav>

        {/* Hero */}
        <div className="text-center space-y-8 mb-20 max-w-4xl mx-auto animate-in zoom-in-95 fade-in duration-1000 delay-100">
          <h1 className="text-5xl md:text-8xl font-black tracking-tight leading-[0.9]">
            Mapping the <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-200 via-white to-slate-400">Unmapped.</span>
          </h1>

          <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed border-l-2 border-crisis-danger/50 pl-6 text-left md:text-center md:border-none md:pl-0">
            A decentralized emergency navigation network powered by <span className="text-sky-400 font-semibold">Gemini 1.5 Pro</span> and community sentinels.
          </p>
        </div>

        {/* Action Grid */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto w-full mb-20">
          {/* Sentinel Mode */}
          <Link href="/sentinel" className="group relative">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-red-600 to-orange-600 rounded-[2rem] opacity-50 group-hover:opacity-100 transition duration-500 blur-sm group-hover:blur opacity-20"></div>
            <div className="relative h-full bg-slate-950 border border-slate-800 rounded-[1.8rem] p-8 md:p-10 flex flex-col justify-between overflow-hidden group-hover:-translate-y-1 transition-transform duration-500 will-change-transform">

              <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                <Camera className="w-32 h-32 rotate-12" />
              </div>

              <div className="space-y-4">
                <div className="w-14 h-14 bg-red-500/10 rounded-2xl flex items-center justify-center group-hover:bg-red-500/20 transition-colors">
                  <Camera className="w-8 h-8 text-red-500" />
                </div>
                <h2 className="text-3xl font-bold group-hover:text-red-400 transition-colors">Sentinel Mode</h2>
                <p className="text-slate-400 leading-relaxed max-w-xs">
                  Upload street imagery. AI analyzes blockages in real-time to reroute ambulances.
                </p>
              </div>

              <div className="mt-8 flex items-center gap-3 text-red-500 font-bold group-hover:gap-5 transition-all">
                Launch Upload <ChevronRight className="w-5 h-5" />
              </div>
            </div>
          </Link>

          {/* Responder Mode */}
          <Link href="/dashboard" className="group relative">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-600 to-blue-600 rounded-[2rem] opacity-50 group-hover:opacity-100 transition duration-500 blur-sm group-hover:blur opacity-20"></div>
            <div className="relative h-full bg-slate-950 border border-slate-800 rounded-[1.8rem] p-8 md:p-10 flex flex-col justify-between overflow-hidden group-hover:-translate-y-1 transition-transform duration-500 will-change-transform">

              <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                <Map className="w-32 h-32 rotate-12" />
              </div>

              <div className="space-y-4">
                <div className="w-14 h-14 bg-emerald-500/10 rounded-2xl flex items-center justify-center group-hover:bg-emerald-500/20 transition-colors">
                  <Navigation className="w-8 h-8 text-emerald-500" />
                </div>
                <h2 className="text-3xl font-bold group-hover:text-emerald-400 transition-colors">Responder View</h2>
                <p className="text-slate-400 leading-relaxed max-w-xs">
                  Live tactical maps with AI overlays. See verified safe routes vs blocked lanes.
                </p>
              </div>

              <div className="mt-8 flex items-center gap-3 text-emerald-500 font-bold group-hover:gap-5 transition-all">
                Open Dashboard <ChevronRight className="w-5 h-5" />
              </div>
            </div>
          </Link>
        </div>


        {/* Mission / Context Section */}
        <div className="mt-24 mb-20 space-y-12 animate-in slide-in-from-bottom-10 fade-in duration-1000 delay-300">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold mb-4">The "Invisible" Crisis</h2>
            <div className="h-1 w-20 bg-crisis-danger mx-auto rounded-full"></div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="glass-panel p-6 rounded-2xl border-l-4 border-crisis-danger">
              <h3 className="text-4xl font-black text-white mb-2">1.1 Billion</h3>
              <p className="text-slate-400 text-sm uppercase tracking-wide font-bold mb-3">People Off the Map</p>
              <p className="text-slate-300 text-sm leading-relaxed">
                Living in informal settlements without official addresses, projected to triple to 3 billion by 2050.
              </p>
            </div>

            <div className="glass-panel p-6 rounded-2xl border-l-4 border-orange-500">
              <h3 className="text-4xl font-black text-white mb-2">24,000</h3>
              <p className="text-slate-400 text-sm uppercase tracking-wide font-bold mb-3">Daily Deaths from Delay</p>
              <p className="text-slate-300 text-sm leading-relaxed">
                In India alone, thousands die daily due to delayed medical assistance. 30% of ER deaths are linked to delays.
              </p>
            </div>

            <div className="glass-panel p-6 rounded-2xl border-l-4 border-crisis-safe">
              <h3 className="text-4xl font-black text-white mb-2">5-10 Min</h3>
              <p className="text-slate-400 text-sm uppercase tracking-wide font-bold mb-3">Critical Delay Time</p>
              <p className="text-slate-300 text-sm leading-relaxed">
                Emergency vehicles in Hyderabad and Kolkata face fatal blockages in narrow, unmapped lanes.
              </p>
            </div>
          </div>

          <div className="text-center">
            <p className="text-slate-500 text-sm italic max-w-2xl mx-auto">
              "Unstructured addresses and poor road infrastructure are the leading causes of preventable loss of life in urban areas." — 2024 Research
            </p>
          </div>
        </div>


        {/* Tech Stack Footer */}
        <div className="mt-auto border-t border-slate-800/50 pt-10 flex flex-col items-center gap-6">

          <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
            <div className="flex items-center gap-2 text-sm font-semibold text-slate-300">
              <Activity className="w-4 h-4 text-sky-400" /> Powered by Gemini
            </div>
            <div className="flex items-center gap-2 text-sm font-semibold text-slate-300">
              <Shield className="w-4 h-4 text-purple-400" /> Polygon Audit
            </div>
            <div className="flex items-center gap-2 text-sm font-semibold text-slate-300">
              <Map className="w-4 h-4 text-yellow-500" /> Google Maps Platform
            </div>
          </div>

          <Link href="/team" className="text-xs font-mono text-slate-600 hover:text-purple-400 transition-colors uppercase tracking-widest">
            Built by Sprint Sisters
          </Link>

        </div>

      </div>
    </main>
  );
}

