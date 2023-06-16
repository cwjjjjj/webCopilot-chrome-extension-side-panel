import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { crx } from "@crxjs/vite-plugin";
import manifest from "./manifest.config";

export default defineConfig({
  plugins: [
    react({
      jsxImportSource: "@emotion/react",
      babel: {
        plugins: ["@emotion/babel-plugin"],
      },
    }),
    crx({ manifest }),
  ],
  esbuild: {
    jsxFactory: "jsx",
    jsxInject: `
      import React from 'react'  
    `,
  },
  build: {
    target: ["chrome90", "edge90", "firefox90", "safari15"],
    rollupOptions: {
      // input: ["popup.html", "sidePanel.html"],
      input: ["sidePanel.html"],
    },
  },
});
