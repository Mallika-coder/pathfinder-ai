// import type { Config } from "tailwindcss";

// export default {
//   content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
//   theme: {
//     extend: {
//       colors: {
//         crisis: {
//           bg: "#0f172a",
//           panel: "#020617",
//           danger: "#ef4444",
//           safe: "#10b981",
//           action: "#34C759",
//           accent: "#38bdf8"
//         }
//       }
//     }
//   },
//   plugins: []
// } satisfies Config;


module.exports = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        crisis: {
          bg: "#0f172a",
          panel: "#020617",
          danger: "#ef4444",
          safe: "#10b981",
        },
      },
    },
  },
  plugins: [],
};
