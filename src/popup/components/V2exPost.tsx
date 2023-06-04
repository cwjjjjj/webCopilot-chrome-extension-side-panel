import { HTMLAttributes } from "react";
import { V2exPost as V2exPostType } from "../types";
import { css } from "@emotion/react";

export interface V2exPostProps extends HTMLAttributes<HTMLDivElement> {
  data: V2exPostType;
}

export default function V2exPost({ data, ...props }: V2exPostProps) {
  console.log("data", data);
  if (!data) {
    return null;
  }

  const {
    content,
    content_rendered,
    title,
    url,
    member,
    node,
    created,
    last_modified,
  } = data ?? {};
  return (
    <a
      href={url}
      target="_blank"
      css={css`
        display: block;
        padding: 10px;
        background-color: #e2e2e2;
        border-radius: 8px;

        .title {
          width: 100%;
          font-weight: 700;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          word-break: break-all;
        }

        .content {
          width: 100%;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
          word-break: break-all;
        }
      `}
    >
      <h5 className="title">{title}</h5>
      <p className="content">{content}</p>
    </a>
  );
}
