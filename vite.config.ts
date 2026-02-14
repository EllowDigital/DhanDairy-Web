import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  optimizeDeps: {
    esbuildOptions: {
      define: {
        "process.env.NODE_ENV": JSON.stringify(
          mode === "development" ? "development" : "production",
        ),
      },
    },
  },
  define: {
    "process.env.NODE_ENV": JSON.stringify(
      mode === "development" ? "development" : "production",
    ),
  },
  server: {
    host: "::",
    port: 5173,
  },
  plugins: [react(), ...(mode === "development" ? [componentTagger()] : [])],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
