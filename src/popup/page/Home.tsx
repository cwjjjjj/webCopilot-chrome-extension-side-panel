import Memorandum from "../components/Memorandum";
import Search from "../components/Search";
import GridLayout, {
  Responsive as ResponsiveGridLayout,
} from "react-grid-layout";
import V2exHotList from "../components/V2exHotList";
import WeiboList from "../components/WeiboList";
import PinnedIcons from "../components/PinnedWebs";
import { useEffect, useRef, useState } from "react";
import Browser from "webextension-polyfill";
import { useRecoilState } from "recoil";
import { memorandumListState, pinnedWebsState } from "../globalState";
import { css } from "@emotion/react";

const layout = [
  { i: "a", x: 0, y: 0, w: 4, h: 2, minW: 2, minH: 2 },
  { i: "b", x: 0, y: 1, w: 2, h: 6, minW: 2, maxW: 4, minH: 6 },
  { i: "c", x: 0, y: 2, w: 4, h: 10, minH: 6 },
  { i: "d", x: 2, y: 1, w: 2, h: 6 },
  { i: "e", x: 0, y: 0, w: 4, h: 2 },
  // { i: "f", x: 0, y: 0, w: 4, h: 10 },
];

export default function Home() {
  const isFirstRef = useRef(true);
  const [pinnedWebs, setPinnedWebs] = useRecoilState(pinnedWebsState);
  const [memorandumList, setMemorandumList] =
    useRecoilState(memorandumListState);
  // const [customUrl, setCustomUrl] = useState<string>("");

  useEffect(() => {
    if (isFirstRef?.current) {
      Browser.storage.sync.get(["pinnedWebs"]).then((res) => {
        setPinnedWebs(res.pinnedWebs);
      });
      Browser.storage.sync.get(["memorandumList"]).then((res) => {
        setMemorandumList(res.memorandumList);
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
      });
    }
  }, [isFirstRef?.current]);
  return (
    <div className="p-[10px] overflow-auto">
      <GridLayout
        className="layout"
        layout={layout}
        cols={12}
        rowHeight={30}
        width={1200}
      >
        <div key="a" className=" bg-[red]">
          <Search />
        </div>
        <div key="b" className=" bg-[orange]">
          <Memorandum />
        </div>
        <div key="c" className=" bg-[green]">
          <V2exHotList />
        </div>
        <div key="d" className=" bg-[pink]">
          <WeiboList />
        </div>
        <div key="e" className=" bg-[#35dac1]">
          <PinnedIcons />
        </div>
        {/* <div key="f" className=" bg-[#a0b3d7] h-full w-full overflow-auto">
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
