import { atom } from "recoil";
import { MemorandumItem } from "../components/Memorandum";
import { Tabs } from "webextension-polyfill/namespaces/tabs";
import { getCurrentTab } from "../../utils/getCurrentTab";
import { WebIconType } from "../components/WebIcon";

export const DEFAULT_PINNED_TABS: WebIconType[] = [
  {
    url: "https://web.okjike.com/",
    id: "1",
    favIconUrl: "https://web.okjike.com/favicon.ico",
  },
  {
    url: "https://www.bing.com/",
    id: "2",
    favIconUrl: "https://www.bing.com/favicon.ico",
  },
  {
    url: "https://www.douban.com/",
    id: "3",
    favIconUrl: "https://www.douban.com/favicon.ico",
  },
  {
    url: "https://www.zhihu.com/",
    id: "4",
    favIconUrl: "https://www.zhihu.com/favicon.ico",
  },
  {
    url: "https://www.bilibili.com",
    id: "5",
    favIconUrl: "https://www.bilibili.com/favicon.ico",
  },
  {
    url: "https://www.github.com",
    id: "6",
    favIconUrl: "https://www.github.com/favicon.ico",
  },
];

export const DEFAULT_MEMORANDUM_LIST: MemorandumItem[] = [
  {
    task: "task1",
    state: "todo",
    id: "1",
  },
  {
    task: "task2",
    state: "done",
    id: "2",
  },
];

export const memorandumListState = atom<MemorandumItem[]>({
  key: "memorandumListState",
  default: DEFAULT_MEMORANDUM_LIST,
});

export const currentTabState = atom<Tabs.Tab | undefined>({
  key: "currentTabState",
  default: undefined,
  // getCurrentTab()
});

export const pinnedWebsState = atom<WebIconType[]>({
  key: "PinnedWebsState",
  default: DEFAULT_PINNED_TABS,
});
