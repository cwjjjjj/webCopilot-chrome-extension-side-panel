// ts 不要检查这个文件
// @ts-nocheck

import Browser from "webextension-polyfill";
import {
  DEFAULT_LAYOUTS,
  DEFAULT_MEMORANDUM_LIST,
  DEFAULT_PINNED_TABS,
} from "../sidePanel/constants";

if (chrome.sidePanel) {
  chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: true });
} else {
  chrome.action.onClicked.addListener(() => {
    chrome.notifications.create({
      type: "basic",
      title: "Unsupported",
      iconUrl: chrome.runtime.getURL("logo.png"),
      message: "Please upgrade your Chrome browser to version 114+",
    });
  });
}

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
