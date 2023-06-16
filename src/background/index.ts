import Browser from "webextension-polyfill";
import {
  DEFAULT_LAYOUTS,
  DEFAULT_MEMORANDUM_LIST,
  DEFAULT_PINNED_TABS,
} from "../sidePanel/constants";

Browser.runtime.onInstalled.addListener(async (detail) => {
  // "install" | "update" | "browser_update"
  // 插件更新
  if (detail.reason === "update" || detail.reason === "browser_update") {
    return;
  }

  // 首次安装
  if (detail.reason === "install") {
    Browser.storage.sync.set({ pinnedWebs: DEFAULT_PINNED_TABS });
    Browser.storage.sync.set({ memorandumList: DEFAULT_MEMORANDUM_LIST });
    Browser.storage.sync.set({ layouts: DEFAULT_LAYOUTS });
  }
});
