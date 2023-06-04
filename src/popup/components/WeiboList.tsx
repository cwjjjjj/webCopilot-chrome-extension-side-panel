import { css } from "@emotion/react";
import weibo from "../assets/weiboIcon.svg";
import { useQuery } from "@tanstack/react-query";
import { get } from "../../utils";
import { WeiboPost as WeiboPostType } from "../types";
import WeiboPost from "./WeiboPost";
import { UndoOutline } from "antd-mobile-icons";
import { Toast } from "antd-mobile";
import { HTMLAttributes } from "react";

const WEIBO_HOT_SEARCH = "https://weibo.com/ajax/side/hotSearch";

export interface WeiboListProps extends HTMLAttributes<HTMLDivElement> {}

export default function WeiboList(props: WeiboListProps) {
  const { data, refetch, isLoading, isFetching } = useQuery<WeiboPostType[]>(
    [WEIBO_HOT_SEARCH],
    async () =>
      get(WEIBO_HOT_SEARCH).then((res) => {
        console.log("res", res.data.data.realtime);
        return res.data.data.realtime;
      })
  );

  const handleRefresh = async () => {
    await refetch();
    Toast.show("刷新成功");
  };

  return (
    <div
      css={css`
        height: 100%;
        overflow: auto;

        .icon {
          width: 20px;
          height: 20px;
          object-fit: contain;
        }
      `}
      {...props}
    >
      <header className=" grid grid-cols-[20px_1fr_14px_55px] items-center gap-[4px] mb-[10px]">
        <img src={weibo} alt="weiboIcon" className="icon" />
        <h4>微博热搜</h4>
        {isFetching ? (
          <UndoOutline
            css={css`
              cursor: pointer;
              animation: spin 1s linear infinite;
            `}
          />
        ) : (
          <UndoOutline
            css={css`
              cursor: pointer;
            `}
            onClick={handleRefresh}
          />
        )}
        <span
          css={css`
            cursor: pointer;
          `}
          onClick={handleRefresh}
        >
          点击刷新
        </span>
      </header>

      <main className="grid gap-[8px]">
        {data?.map((item) => {
          return <WeiboPost key={item.mid} data={item} />;
        })}
      </main>
    </div>
  );
}
