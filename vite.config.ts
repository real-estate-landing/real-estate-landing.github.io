import { defineConfig } from "vite";
import environmentPlugin from "vite-plugin-environment";
import legacy from "@vitejs/plugin-legacy";
import fullReload from "vite-plugin-full-reload";
import { nodePolyfills } from "vite-plugin-node-polyfills";
import react from "@vitejs/plugin-react-swc";
import { splitVendorChunkPlugin } from "vite";

export default defineConfig({
  plugins: [
    react(),
    fullReload(["**/*.ts*", "**/*.js*", "**/*.mjs"], {
      always: true,
      root: "src",
    }),
    splitVendorChunkPlugin(),
    nodePolyfills({
      protocolImports: true,
    }),
    environmentPlugin("all", { loadEnvFiles: true, prefix: "VITE_" }),
    legacy({
      targets: ["defaults", "not IE 11"],
      polyfills: ["es.promise.finally", "es/map", "es/set"],
      modernPolyfills: ["es.promise.finally"],
    }),
  ],
  build: {
    target: "chrome87",
    outDir: "build",
    minify: "terser",
  },
  server: {
    hmr: false,
  },
});
