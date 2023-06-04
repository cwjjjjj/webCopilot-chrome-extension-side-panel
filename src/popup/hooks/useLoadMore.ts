import {
  DependencyList,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

export interface PageableParams {
  limit?: number;
  loadMoreKey?: string;
  coordType?: string;
  city?: string;
  location?: number[];
}

export interface PageableResponse<DataItem> {
  data?: DataItem[];
  loadMoreKey?: unknown;
}

export type Fetch<DataItem> = (
  /**
   * 获取数据的模式
   *
   * HARD_REFRESH: 硬刷新。清空数据，重新第一页数据
   *
   * REFRESH: （软）刷新。重新获取当前数据长度的数据
   *
   * LOAD_MORE: 加载下一页。
   *
   * @default LOAD_MORE
   */
  mode: "REFRESH" | "LOAD_MORE" | "HARD_REFRESH",
  options?: any
) => Promise<DataItem[]>;

export interface UseLoadMoreOptions {
  pageSize: number;
}

export default function useLoadMore<
  Params extends PageableParams,
  DataItem extends object
>(
  key: DependencyList,
  fetcher: (params: Params) => Promise<PageableResponse<DataItem>>,
  options?: UseLoadMoreOptions
) {
  const { pageSize }: UseLoadMoreOptions = {
    pageSize: 50,
    ...options,
  };
  const [current, setCurrent] = useState(1);
  const loadMoreKeyRef = useRef<any>(null);
  const [totalData, setTotalData] = useState<DataItem[]>([]);
  const [isLoading, setLoading] = useState(false);
  const fetch: Fetch<DataItem> = useCallback(
    (
      mode: "REFRESH" | "HARD_REFRESH" | "LOAD_MORE" = "LOAD_MORE",
      fetchOptions?: Params
    ) =>
      new Promise<PageableResponse<DataItem>>((resolve, reject) => {
        setLoading(true);
        if (mode === "REFRESH" || mode === "HARD_REFRESH") {
          resolve(
            fetcher({
              limit: mode === "HARD_REFRESH" ? pageSize : totalData.length,
              ...fetchOptions,
            } as Params)
          );
        } else if (
          mode === "LOAD_MORE" &&
          (totalData.length === 0 || loadMoreKeyRef.current)
        ) {
          resolve(
            fetcher({
              limit: pageSize,
              loadMoreKey: loadMoreKeyRef.current,
            } as Params)
          );
        }

        reject();
      })
        .then((res) => {
          const { data: rawData, loadMoreKey } =
            res ?? ({} as PageableResponse<DataItem>);
          const nextData = rawData ?? ([] as DataItem[]);

          loadMoreKeyRef.current = loadMoreKey;
          switch (mode) {
            case "LOAD_MORE":
              setTotalData((prev) => [...prev, ...nextData]);
              setCurrent((prev) => prev + 1);
              break;
            case "REFRESH":
              setTotalData(nextData);
              break;
            case "HARD_REFRESH":
              setTotalData(nextData);
              setCurrent(1);
              break;
            default:
              break;
          }

          return nextData;
        })
        .finally(() => {
          setLoading(false);
        }),
    [totalData.length, fetcher, pageSize]
  );

  useEffect(() => {
    fetch("HARD_REFRESH");
  }, key);

  return {
    current,
    onCurrentChange: setCurrent,
    data: totalData.slice((current - 1) * pageSize, current * pageSize),
    total: totalData.length,
    totalData,
    setTotalData,
    isLoading,
    hasNext: !!loadMoreKeyRef.current,
    onRefresh: (options?: Params) => fetch("REFRESH", options),
    onHardRefresh: (options?: Params) => fetch("HARD_REFRESH", options),
    onNext: (options?: Params) => fetch("LOAD_MORE", options),
  };
}
