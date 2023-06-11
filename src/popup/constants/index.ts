import { MemorandumItem } from "../components/Memorandum";
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

export const DEFAULT_LAYOUTS = [
  { i: "a", x: 0, y: 0, w: 4, h: 2, minW: 2, minH: 2 },
  { i: "b", x: 0, y: 1, w: 2, h: 6, minW: 2, maxW: 4, minH: 6 },
  { i: "c", x: 0, y: 2, w: 4, h: 10, minH: 6 },
  { i: "d", x: 2, y: 1, w: 2, h: 6 },
  { i: "e", x: 0, y: 0, w: 4, h: 2 },
];
