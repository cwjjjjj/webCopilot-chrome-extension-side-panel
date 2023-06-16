import { defineManifest } from "@crxjs/vite-plugin";
import packageJson from "./package.json";
const { version } = packageJson;

// Convert from Semver (example: 0.1.0-beta6)
const [major, minor, patch, label = "0"] = version
  // can only contain digits, dots, or dash
  .replace(/[^\d.-]+/g, "")
  // split into version parts
  .split(/[.-]/);

export default defineManifest(async (env) => ({
  manifest_version: 3,
  icons: {
    "16": "logo.png",
    "32": "logo.png",
    "48": "logo.png",
    "128": "logo.png",
  },
  name: "webCopilot",
  version: "0.0.4",
  action: {},
  content_scripts: [
    {
      js: ["src/content/index.tsx"],
      matches: ["<all_urls>"],
    },
  ],
  background: {
    service_worker: "src/background",
  },
  side_panel: {
    default_path: "index.html",
  },
  permissions: ["tabs", "storage", "sidePanel"],
  commands: {},
}));
