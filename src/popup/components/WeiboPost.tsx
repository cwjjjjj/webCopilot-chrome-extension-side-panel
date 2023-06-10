import { HTMLAttributes } from "react";
import { WeiboPost as WeiboPostType } from "../types";
import { css } from "@emotion/react";
import { Toast } from "antd-mobile";

export interface WeiboPostProps extends HTMLAttributes<HTMLAnchorElement> {
  data: WeiboPostType;
}

// const LABEL_BG_COLOR_MAP = {
//   热: " rgb(255, 148, 6)",
//   新: "rgb(255, 56, 82)",
//   商: "rgb(0, 183, 238)",
//   暖: "rgb(255, 171, 90)",
//   爆: "rgb(69, 59, 212)",
// };

export default function WeiboPost({ data, ...props }: WeiboPostProps) {
  if (!data) {
    return null;
  }
  const {
    rank,
    note,
    word,
    category,
    flag_desc,
    subject_label,
    small_icon_desc,
    small_icon_desc_color,
    word_scheme,
  } = data ?? {};
  return (
    <a
      {...props}
      css={css`
        display: grid;
        grid-template-columns: 20px 1fr 16px;
        gap: 2px;

        .title {
          width: 100%;
          font-weight: 500;
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          overflow: hidden;
          word-break: break-all;
        }

        span {
          color: #ff8200;
        }
      `}
      href={`https://s.weibo.com/weibo?q=${encodeURIComponent(
        word_scheme ?? word
      )}`}
      target="_blank noreferrer"
    >
      <span
        css={css`
          color: ${small_icon_desc_color};
        `}
      >
        {rank + 1}
      </span>
      <h4 className="title">{note}</h4>
      {small_icon_desc && (
        <div
          css={css`
            background-color: ${small_icon_desc_color};
            border-radius: 4px;
            color: white;
            font-weight: 600;
          `}
          className=" flex justify-center items-center"
        >
          {small_icon_desc}
        </div>
      )}
    </a>
  );
}
