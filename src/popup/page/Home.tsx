import Memorandum from "../components/Memorandum";
import Search from "../components/Search";
import GridLayout, {
  Layout,
  Responsive as ResponsiveGridLayout,
} from "react-grid-layout";
import V2exHotList from "../components/V2exHotList";
import WeiboList from "../components/WeiboList";
import PinnedIcons from "../components/PinnedWebs";
import { useEffect, useRef } from "react";
import Browser from "webextension-polyfill";
import { useRecoilState } from "recoil";
import {
  buttonPositionState,
  currentSearchEngineState,
  isEditingState,
  layoutState,
  memorandumListState,
  pinnedWebsState,
} from "../globalState";
import { css } from "@emotion/react";
import { Button, FloatingBubble } from "antd-mobile";
import layoutSvg from "../assets/layout.svg";
import saveSvg from "../assets/save.svg";

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
  const [isEdit, setIsEdit] = useRecoilState(isEditingState);
  const [offset, setOffset] = useRecoilState(buttonPositionState);

  const handleLayoutChange = (layouts: Layout[]) => {
    // tofix 第一次进入的时候也会触发 onchange
    if (isFirstRef?.current) {
      return;
    }
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
        setLayouts(res.layouts);
      });
      Browser.storage.sync.get(["buttonPosition"]).then((res) => {
        setOffset(res.buttonPosition);
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
          console.log(res?.layouts?.newValue);
          setLayouts(res?.layouts?.newValue);
        }
        if (res?.buttonPosition) {
          setOffset(res?.buttonPosition?.newValue);
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
          height: 100%;
          width: 100%;
          pointer-events: ${isEdit ? "none" : "auto"};
        }
      `}
    >
      <GridLayout
        className="layout"
        layout={layouts}
        cols={2000}
        rowHeight={1}
        width={2000}
        onLayoutChange={handleLayoutChange}
        isBounded
        isDraggable={isEdit}
        isResizable={isEdit}
        resizeHandles={["s", "w", "e", "n", "sw", "nw", "se", "ne"]}
        margin={[0, 0]}
      >
        <div key="search">
          <div className=" module">
            <Search currentSearchEngine={currentSearchEngine} />
          </div>
        </div>
        <div key="memorandum">
          <div className=" module">
            <Memorandum />
          </div>
        </div>
        <div key="v2ex">
          <div className=" module">
            <V2exHotList />
          </div>
        </div>
        <div key="weibo">
          <div className=" module">
            <WeiboList />
          </div>
        </div>
        <div key="icons">
          <div className=" module">
            <PinnedIcons />
          </div>
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
      <FloatingBubble
        axis="xy"
        style={{
          "--initial-position-bottom": "0",
          "--initial-position-right": "0",
          "--background": "rgba(0,0,0,0.2)",
        }}
        onOffsetChange={(buttonPosition) => {
          setOffset(buttonPosition);
          Browser.storage.sync.set({ buttonPosition: buttonPosition });
        }}
        offset={offset}
        onClick={() => {
          setIsEdit(!isEdit);
        }}
      >
        {isEdit ? (
          <img
            src={layoutSvg}
            alt=""
            css={css`
              height: 40px;
              width: 40px;
              padding: 5px;
            `}
          />
        ) : (
          <img
            src={saveSvg}
            alt=""
            css={css`
              height: 40px;
              width: 40px;
              padding: 5px;
            `}
          />
        )}
      </FloatingBubble>
    </div>
  );
}
