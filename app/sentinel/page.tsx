// import SentinelUpload from "@/components/SentinelUpload";

// export default function SentinelPage() {
//   return (
//     <div className="min-h-screen bg-crisis-bg p-4 flex items-center justify-center">
//       <div className="bg-crisis-panel w-full max-w-md rounded-xl p-6 space-y-6">
//         <h2 className="text-2xl font-bold text-center">
//           Emergency Upload
//         </h2>

//         <p className="text-slate-400 text-center">
//           Take a photo of the blocked lane. Location is auto-detected.
//         </p>

//         <SentinelUpload />
//       </div>
//     </div>
//   );
// }

import SentinelUpload from "@/components/SentinelUpload";

export default function SentinelPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950">
      <SentinelUpload />
    </div>
  );
}

