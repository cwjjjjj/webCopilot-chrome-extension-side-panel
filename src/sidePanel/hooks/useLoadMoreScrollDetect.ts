import { UIEventHandler, useCallback, useRef } from "react";

// eslint-disable-next-line @typescript-eslint/ban-types
export default function useLoadMoreScrollDetect(
  onLoadMore?: () => Promise<any>
) {
  const ref = useRef<HTMLDivElement>(null);
  const hasLoadMoreTriggeredRef = useRef(false);

  const handleScroll: UIEventHandler<HTMLDivElement> = useCallback(
    (e) => {
      if (!ref.current) {
        return;
      }

      const { scrollTop, scrollHeight, clientHeight } = ref.current;

      if (
        scrollHeight - scrollTop <= clientHeight * 2 &&
        !hasLoadMoreTriggeredRef.current
      ) {
        hasLoadMoreTriggeredRef.current = true;

        onLoadMore?.().finally(() => {
          hasLoadMoreTriggeredRef.current = false;
        });
      }
    },
    [onLoadMore]
  );

  return {
    ref,
    onScroll: handleScroll,
  };
}
