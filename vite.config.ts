import { defineConfig } from "vite";
import environmentPlugin from "vite-plugin-environment";
import legacy from "@vitejs/plugin-legacy";
import fullReload from "vite-plugin-full-reload";
import { nodePolyfills } from "vite-plugin-node-polyfills";
import react from "@vitejs/plugin-react-swc";
import { splitVendorChunkPlugin } from "vite";
import { VitePWA } from "vite-plugin-pwa";
const manifestForPlugIn = {
  registerType:'prompt',
  includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'mask-icon.svg'],
  manifest:{
    name:"Real Estate CRM",
    short_name:"RE-CRM",
    description:"real-estate-crm or real estate crm web application provides centralized data storage, process automation and increased efficiency of interaction with customers, which significantly simplifies sales management.",
    icons:[
      {
        src: "/images/32p.png",
        sizes: "32x32",
        type: "image/png"
      },
      {
        src: "/images/64p.png",
        sizes: "64x64",
        type: "image/png"
      },
      {
        src: "/images/96p.png",
        sizes: "96x96",
        type: "image/png"
      },
      {
      src: '/images/128p.png',
      sizes:'128x128',
      type:'image/png',
    },
      {
      src: '/images/144p.png',
      sizes:'144x144',
      type:'image/png',
    },
    {
      src: "/images/167p.png",
      sizes: "167x167",
      type: "image/png"
    },
    {
      src: '/images/192p.png',
      sizes: '192x192',
      type: 'image/png'
    },
    {
      src: "/images/256p.png",
      sizes: "256x256",
      type: "image/png"
    },
    {
      src: '/images/512p.png',
      sizes: '512x512',
      type: 'image/png'
    },
  ],
  theme_color:'#171717',
  background_color:'#f0e7db',
  display:"standalone",
  scope:'/',
  start_url:"/",
  orientation:'portrait'
  }
}
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
    VitePWA(manifestForPlugIn)
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
