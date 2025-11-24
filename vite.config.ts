import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

export default defineConfig(({ mode }) => ({
  // 🛠 Local development settings (only when you run `npm run dev`)
  server: {
    host: "::",
    port: 8080,
  },

  // 🚀 Production preview settings (used by Coolify deployment)
  preview: {
    host: true,
    port: 3000,
    allowedHosts: [
      "v0scgcko4kwog04sc40ssw4g.213.199.54.102.sslip.io",
      "createmedia.pro",
      "www.createmedia.pro"
    ],
  },

  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
