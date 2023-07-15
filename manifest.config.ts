import { defineManifest } from "@crxjs/vite-plugin";
import packageJson from "./package.json";
const { version } = packageJson;

// Convert from Semver (example: 0.1.0-beta6)
const [major, minor, patch, label = "0"] = version
  // can only contain digits, dots, or dash
  .replace(/[^\d.-]+/g, "")
  // split into version parts
  .split(/[.-]/);

export default defineManifest(async (env) => {
  return {
    manifest_version: 3,
    default_locale: "en",
    icons: {
      "16": "logo.png",
      "32": "logo.png",
      "48": "logo.png",
      "128": "logo.png",
    },
    name: "webCopilot",
    version:
      env.mode === "development" ? "999.999.999" : `${major}.${minor}.${patch}`,
    action: {
      // default_popup: "popup.html",
    },
    host_permissions: ["https://*.v2ex.com/", "https://weibo.com/*"],
    background: {
      service_worker: "src/background",
    },
    side_panel: {
      default_path: "sidePanel.html",
    },
    permissions: ["tabs", "storage", "sidePanel"],
    commands: {
      "search-focus": {
        suggested_key: {
          default: "Alt+S",
          windows: "Alt+S",
          mac: "Alt+S",
        },
        description: "__MSG_shortCutsSearch__",
      },
    },
  };
});
