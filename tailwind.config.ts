import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#22c55e",
      },
      backgroundImage: {
        "main-gradient": "linear-gradient(to bottom right, #0f172a, #1e293b)",
      },
    },
  },
  plugins: [],
};

export default config;