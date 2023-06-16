import { useQuery } from "@tanstack/react-query";
import { get } from "../../utils";
import { V2exPost as V2exPostType } from "../types";
import V2exPost from "./V2exPost";
import { css } from "@emotion/react";
import { HTMLAttributes, useEffect, useState } from "react";

const V2ex_HOTTEST_LIST = "https://www.v2ex.com/api/topics/hot.json";

const V2ex_LATEST_LIST = "https://www.v2ex.com/api/topics/latest.json";

type Tab = "hottest" | "latest";

export interface V2exProps extends HTMLAttributes<HTMLDivElement> {}

export default function V2ex(props: V2exProps) {
  const [currentTab, setCurrentTab] = useState<Tab>("hottest");

  const { data: hottestList } = useQuery<V2exPostType[]>(
    [V2ex_HOTTEST_LIST, currentTab],
    async () => get(V2ex_HOTTEST_LIST).then((res) => res.data),
    {
      enabled: currentTab === "hottest",
    }
  );

  const { data: latestList } = useQuery<V2exPostType[]>(
    [V2ex_LATEST_LIST, currentTab],
    async () => get(V2ex_LATEST_LIST).then((res) => res.data),
    {
      enabled: currentTab === "latest",
    }
  );

  return (
    <div
      className="list-wrapper"
      css={css`
        .header {
          height: 20px;

          img {
            height: 100%;
            object-fit: contain;
          }
        }

        .active {
          color: #1890ff;
        }
      `}
      {...props}
    >
      <header className="header flex justify-between">
        <img src="https://www.v2ex.com/static/img/v2ex@2x.png" alt="" />
        <section className="flex gap-[10px] font-[600]">
          <a
            className={currentTab === "latest" ? "active" : ""}
            onClick={() => {
              setCurrentTab("latest");
            }}
          >
            最新
          </a>
          <a
            className={currentTab === "hottest" ? "active" : ""}
            onClick={() => {
              setCurrentTab("hottest");
            }}
          >
            最热
          </a>
        </section>
      </header>
      <div className="list">
        {currentTab === "hottest" &&
          hottestList?.map((item) => <V2exPost data={item} key={item.id} />)}
      </div>

      <div className="list">
        {currentTab === "latest" &&
          latestList?.map((item) => <V2exPost data={item} key={item.id} />)}
      </div>
    </div>
  );
}
