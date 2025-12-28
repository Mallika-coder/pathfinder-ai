
import Link from "next/link";
import { Users, Instagram, Heart, ArrowLeft, Code2, Sparkles } from "lucide-react";

export default function TeamPage() {
    return (
        <main className="min-h-screen bg-crisis-bg text-white relative overflow-hidden selection:bg-crisis-danger/30">

            {/* Background Elements */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] bg-purple-600/10 rounded-full blur-[120px] mix-blend-screen animate-pulse"></div>
                <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-pink-600/10 rounded-full blur-[120px] mix-blend-screen animate-pulse" style={{ animationDelay: '3s' }}></div>
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-6 pt-12 pb-20">

                {/* Nav */}
                <nav className="mb-16 flex items-center gap-4 animate-in slide-in-from-top-10 fade-in duration-700">
                    <Link href="/" className="p-2 -ml-2 hover:bg-white/10 rounded-full transition-colors text-slate-400 hover:text-white">
                        <ArrowLeft className="w-6 h-6" />
                    </Link>
                    <span className="flex items-center gap-2 text-xl font-bold tracking-tight">
                        Sprint<span className="text-purple-400">Sisters</span>
                    </span>
                </nav>

                {/* Header */}
                <div className="text-center mb-24 space-y-4 animate-in zoom-in-95 fade-in duration-1000">
                    <h1 className="text-5xl md:text-7xl font-black tracking-tighter">
                        Meet the <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-red-400">Creators.</span>
                    </h1>
                    <p className="text-xl text-slate-400 max-w-2xl mx-auto">
                        The visionary minds behind PathFinder AI.
                    </p>
                </div>

                {/* Team Grid */}
                <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">

                    {/* Mallika */}
                    <div className="group relative">
                        <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-[2rem] opacity-30 group-hover:opacity-100 transition duration-500 blur-xl group-hover:blur-2xl"></div>
                        <div className="relative h-full bg-black/60 backdrop-blur-xl border border-white/10 rounded-[2rem] p-8 md:p-12 text-center overflow-hidden flex flex-col items-center">

                            <div className="w-32 h-32 mb-8 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 p-1 shadow-2xl shadow-purple-500/30 group-hover:scale-105 transition-transform duration-500">
                                <div className="w-full h-full rounded-full bg-zinc-900 flex items-center justify-center overflow-hidden">
                                    {/* Placeholder for real image if available, else Initials/Icon */}
                                    <Code2 className="w-12 h-12 text-purple-400" />
                                </div>
                            </div>

                            <h2 className="text-3xl font-bold text-white mb-2">Mallika Verma</h2>
                            <div className="px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 text-xs font-bold tracking-wider uppercase mb-6 border border-purple-500/30">
                                Team Leader
                            </div>

                            <p className="text-slate-400 leading-relaxed mb-8">
                                Lead Developer and Architect of PathFinder AI. Passionate about using technology to solve real-world humanitarian crises.
                            </p>

                            <a
                                href="https://www.instagram.com/creative_mallika_0542/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 text-white font-bold bg-gradient-to-r from-purple-600 to-pink-600 px-6 py-3 rounded-xl hover:shadow-lg hover:shadow-purple-500/25 transition-all hover:-translate-y-1"
                            >
                                <Instagram className="w-5 h-5" />
                                Follow on Instagram
                            </a>
                        </div>
                    </div>

                    {/* Khushi */}
                    <div className="group relative">
                        <div className="absolute -inset-1 bg-gradient-to-r from-pink-600 to-orange-600 rounded-[2rem] opacity-30 group-hover:opacity-100 transition duration-500 blur-xl group-hover:blur-2xl"></div>
                        <div className="relative h-full bg-black/60 backdrop-blur-xl border border-white/10 rounded-[2rem] p-8 md:p-12 text-center overflow-hidden flex flex-col items-center">

                            <div className="w-32 h-32 mb-8 rounded-full bg-gradient-to-br from-pink-500 to-orange-500 p-1 shadow-2xl shadow-pink-500/30 group-hover:scale-105 transition-transform duration-500">
                                <div className="w-full h-full rounded-full bg-zinc-900 flex items-center justify-center overflow-hidden">
                                    <Sparkles className="w-12 h-12 text-pink-400" />
                                </div>
                            </div>

                            <h2 className="text-3xl font-bold text-white mb-2">Khushi Verma</h2>
                            <div className="px-3 py-1 rounded-full bg-pink-500/20 text-pink-300 text-xs font-bold tracking-wider uppercase mb-6 border border-pink-500/30">
                                Co-Creator
                            </div>

                            <p className="text-slate-400 leading-relaxed mb-8">
                                Design visionary and creative strategist. Ensuring PathFinder AI is not just functional, but accessible and impactful.
                            </p>

                            <a
                                href="https://www.instagram.com/khushi_verma5075/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 text-white font-bold bg-gradient-to-r from-pink-600 to-orange-600 px-6 py-3 rounded-xl hover:shadow-lg hover:shadow-pink-500/25 transition-all hover:-translate-y-1"
                            >
                                <Instagram className="w-5 h-5" />
                                Follow on Instagram
                            </a>
                        </div>
                    </div>

                </div>

                {/* Footer */}
                <div className="mt-24 text-center text-slate-500 text-sm flex items-center justify-center gap-2">
                    Made with <Heart className="w-4 h-4 text-red-500 fill-current animate-pulse" /> by Sprint Sisters
                </div>

            </div>
        </main>
    );
}
