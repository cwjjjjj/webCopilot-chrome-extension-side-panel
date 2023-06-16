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
  { i: "search", x: 0, y: 0, w: 400, h: 90 },
  { i: "icons", x: 0, y: 100, w: 400, h: 80 },
  {
    i: "memorandum",
    x: 0,
    y: 180,
    w: 200,
    h: 500,
  },
  { i: "weibo", x: 200, y: 180, w: 200, h: 500 },
  { i: "v2ex", x: 0, y: 680, w: 400, h: 600 },
];

export const DEFAULT_BUTTON_POSITION = { x: -24, y: -24 };
