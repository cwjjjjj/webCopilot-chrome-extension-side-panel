import Memorandum from "../components/Memorandum";
import Search from "../components/Search";
import GridLayout, {
  Layout,
  Responsive as ResponsiveGridLayout,
} from "react-grid-layout";
import V2exHotList from "../components/V2exHotList";
import WeiboList from "../components/WeiboList";
import PinnedIcons from "../components/PinnedWebs";
import { useEffect, useRef, useState } from "react";
import Browser from "webextension-polyfill";
import { useRecoilState } from "recoil";
import {
  currentSearchEngineState,
  layoutState,
  memorandumListState,
  pinnedWebsState,
} from "../globalState";
import { css } from "@emotion/react";

export default function Home() {
  const isFirstRef = useRef(true);
  const [pinnedWebs, setPinnedWebs] = useRecoilState(pinnedWebsState);
  const [memorandumList, setMemorandumList] =
    useRecoilState(memorandumListState);
  // const [customUrl, setCustomUrl] = useState<string>("");
  const [currentSearchEngine, setCurrentSearchEngine] = useRecoilState(
    currentSearchEngineState
  );
  const [layouts, setLayouts] = useRecoilState(layoutState);

  const handleLayoutChange = (layouts: Layout[]) => {
    console.log("layout", layouts);
    setLayouts(layouts);
    Browser.storage.sync.set({ layouts });
  };

  useEffect(() => {
    if (isFirstRef?.current) {
      Browser.storage.sync.get(["pinnedWebs"]).then((res) => {
        setPinnedWebs(res.pinnedWebs);
      });
      Browser.storage.sync.get(["memorandumList"]).then((res) => {
        setMemorandumList(res.memorandumList);
      });
      Browser.storage.sync.get(["currentSearchEngine"]).then((res) => {
        setCurrentSearchEngine(res.currentSearchEngine);
      });
      Browser.storage.sync.get(["layouts"]).then((res) => {
        console.log("layouts get", res.layouts);
        setLayouts(res.layouts);
      });

      isFirstRef.current = false;
    } else {
      Browser.storage.onChanged.addListener((res) => {
        if (res?.pinnedWebs) {
          setPinnedWebs(res?.pinnedWebs?.newValue);
        }
        if (res?.memorandumList) {
          setMemorandumList(res?.memorandumList?.newValue);
        }
        if (res?.currentSearchEngine) {
          setCurrentSearchEngine(res?.currentSearchEngine?.newValue);
        }
        if (res?.layouts) {
          console.log("layouts change", res.layouts);
          setLayouts(res?.layouts?.newValue);
        }
      });
    }
  }, [isFirstRef?.current]);

  return (
    <div
      className="p-[10px] overflow-auto"
      css={css`
        .module {
          background-color: rgba(0, 0, 0, 0.2);
          border-radius: 10px;
          overflow: hidden;
          padding: 2px 4px;
        }
      `}
    >
      <GridLayout
        className="layout"
        layout={layouts}
        cols={12}
        rowHeight={30}
        width={1200}
        onLayoutChange={handleLayoutChange}
      >
        <div key="a" className=" module">
          <Search currentSearchEngine={currentSearchEngine} />
        </div>
        <div key="b" className=" module">
          <Memorandum />
        </div>
        <div key="c" className=" module">
          <V2exHotList />
        </div>
        <div key="d" className=" module">
          <WeiboList />
        </div>
        <div key="e" className=" module">
          <PinnedIcons />
        </div>
        {/* <div key="f" className="  h-full w-full overflow-auto">
          <input
            type="text"
            value={customUrl}
            onChange={(e) => {
              setCustomUrl(e.target.value);
            }}
          />
          <iframe
            src={customUrl}
            css={css`
              width: 100%;
              height: 100%;
            `}
          />
        </div> */}
      </GridLayout>
    </div>
  );
}
