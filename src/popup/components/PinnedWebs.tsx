import { HTMLAttributes } from "react";
import { getCurrentTab } from "../../utils/getCurrentTab";
import WebIcon, { WebIconType } from "./WebIcon";
import { css } from "@emotion/react";
import { DEFAULT_PINNED_TABS, pinnedWebsState } from "../globalState";
import { useRecoilState } from "recoil";

export interface PinnedWebsProps extends HTMLAttributes<HTMLDivElement> {}

export default function PinnedWebs(props: PinnedWebsProps) {
  const [pinnedWebs, setPinnedWebs] = useRecoilState(pinnedWebsState);

  return (
    <div
      {...props}
      css={css`
        height: 100%;
        width: 100%;
        overflow: auto;
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
        padding: 10px;
        align-content: flex-start;
        justify-content: flex-start;
      `}
    >
      {pinnedWebs?.map((item) => (
        <WebIcon key={item.id} data={item} />
      ))}
      <WebIcon add />
    </div>
  );
}
