import { atom } from "recoil";
import { MemorandumItem } from "../components/Memorandum";
import { Tabs } from "webextension-polyfill/namespaces/tabs";
import { WebIconType } from "../components/WebIcon";
import { SearchEngine } from "../components/Search";
import { Layout } from "react-grid-layout";
import {
  DEFAULT_BUTTON_POSITION,
  DEFAULT_LAYOUTS,
  DEFAULT_MEMORANDUM_LIST,
  DEFAULT_PINNED_TABS,
} from "../constants";

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

export const currentSearchEngineState = atom<SearchEngine>({
  key: "currentSearchEngineState",
  default: { searchEngine: "Google" },
});

export const layoutState = atom<Layout[]>({
  key: "layoutState",
  default: DEFAULT_LAYOUTS,
});

export const isEditingState = atom<boolean>({
  key: "isEditingState",
  default: false,
});

export const buttonPositionState = atom<{
  x: number;
  y: number;
}>({
  key: "buttonPositionState",
  default: DEFAULT_BUTTON_POSITION,
});

export const searchFocusShortCutState = atom<string>({
  key: "searchFocusState",
  default: "",
});
