
import SentinelUpload from "../../components/SentinelUpload";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function SentinelPage() {
  return (
    <main className="min-h-screen bg-crisis-bg p-4 flex flex-col items-center justify-center relative">
      <Link href="/" className="absolute top-4 left-4 text-slate-400 hover:text-white flex items-center gap-2">
        <ArrowLeft className="w-5 h-5" /> Back
      </Link>

      <div className="w-full max-w-md space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white mb-2">Sentinel Mode</h1>
          <p className="text-slate-400">
            Your photos help ambulances save lives.
          </p>
        </div>

        <SentinelUpload />

        <div className="text-center text-xs text-slate-600 mt-8">
          <p>PathFinder AI • Powered by Gemini 1.5 Pro</p>
        </div>
      </div>
    </main>
  );
}
