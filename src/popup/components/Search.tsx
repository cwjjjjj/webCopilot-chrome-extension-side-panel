import { css } from "@emotion/react";
import { HTMLAttributes, useCallback, useState } from "react";
import baiduIcon from "../assets/baiduIcon.png";
import googleIcon from "../assets/googleIcon.png";
import bingIcon from "../assets/bingIcon.png";
import { Popover } from "antd-mobile";
import { Action } from "antd-mobile/es/components/popover";
import Browser from "webextension-polyfill";

export interface SearchProps extends HTMLAttributes<HTMLDivElement> {}

export type SearchEngine = Record<string, string>;

export const SEARCH_ENGINE = {
  Google: "https://www.google.com/search?q=",
  Baidu: "https://www.baidu.com/s?wd=",
  Bing: "https://www.bing.com/search?q=",
};

const SearchEngineList = Object.entries(SEARCH_ENGINE).map(
  ([searchEngine, url]) => {
    return {
      searchEngine,
      url,
    };
  }
);
const SearchEngineListLength = SearchEngineList.length;

export default function Search({ ...props }: SearchProps) {
  const [isShowPicker, setIsShowPicker] = useState(false);
  const [currentHoverItemIndex, setCurrentHoverItemIndex] = useState(0);
  const [inputValue, setInputValue] = useState<string>();

  const currentSearchIcon = useCallback((searchEngine: string) => {
    if (!searchEngine) {
      return <img src={baiduIcon} alt="baiduIcon" />;
    }
    return searchEngine === "Google" ? (
      <img src={googleIcon} alt="googleIcon" />
    ) : searchEngine === "Baidu" ? (
      <img src={baiduIcon} alt="baiduIcon" />
    ) : searchEngine === "Bing" ? (
      <img src={bingIcon} alt="bingIcon" />
    ) : null;
  }, []);

  const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      // @ts-ignore
      handleSearch(inputValue, SearchEngineList[currentHoverItemIndex].url);
    }
    if (e.key === "Escape") {
      setIsShowPicker(false);
    }
    if (e.key === "ArrowUp") {
      e.preventDefault();
      setCurrentHoverItemIndex((prev) =>
        prev - 1 < 0 ? SearchEngineListLength - 1 : prev - 1
      );
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      if (!isShowPicker) {
        setIsShowPicker(true);
      }
      setCurrentHoverItemIndex((prev) =>
        prev + 1 > SearchEngineListLength - 1 ? 0 : prev + 1
      );
    }
  };

  const handleSearch = (value?: string, searchEngineUrl?: string) => {
    setInputValue("");
    setIsShowPicker(false);
    if (!inputValue) {
      return;
    }
  };

  return (
    <div
      css={css`
        height: 100%;
        width: 100%;
        overflow: auto;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 10px;

        .searchbar {
          font-size: 14px;
          font-family: arial, sans-serif;
          color: #202124;
          display: flex;
          height: 44px;
          background: white;
          border: 1px solid #dfe1e5;
          box-shadow: none;
          border-radius: 24px;
          width: 100%;
        }

        .searchbar:hover {
          box-shadow: 0 1px 6px rgb(32 33 36 / 28%);
          border-color: rgba(223, 225, 229, 0);
        }

        .searchbar-wrapper {
          flex: 1;
          display: flex;
          padding: 5px 8px 0 14px;
        }

        .searchbar-left {
          font-size: 14px;
          font-family: arial, sans-serif;
          color: #202124;
          display: flex;
          align-items: center;
          padding-right: 13px;
          margin-top: -5px;
        }

        .search-icon-wrapper {
          margin: auto;
        }

        .search-icon {
          margin-top: 3px;
          color: #9aa0a6;
          height: 20px;
          line-height: 20px;
          width: 20px;
        }

        .searchbar-icon {
          display: inline-block;
          fill: currentColor;
          height: 24px;
          line-height: 24px;
          position: relative;
          width: 24px;
        }

        .searchbar-center {
          display: flex;
          flex: 1;
          flex-wrap: wrap;
        }

        .searchbar-input-spacer {
          color: transparent;
          flex: 100%;
          white-space: pre;
          height: 34px;
          font-size: 16px;
        }

        .searchbar-input {
          background-color: transparent;
          border: none;
          margin: 0;
          padding: 0;
          color: rgba(0, 0, 0, 0.87);
          word-wrap: break-word;
          outline: none;
          display: flex;
          flex: 100%;
          margin-top: -37px;
          height: 34px;
          font-size: 16px;
        }

        .searchbar-right {
          display: flex;
          flex: 0 0 auto;
          margin-top: -5px;
          align-items: stretch;
          flex-direction: row;
        }

        .picker {
          width: 141px;
          position: absolute;
          background-color: rgba(255, 255, 255, 0.15);
          backdrop-filter: blur(17.5px);
          border-radius: 12px;
          padding: 10px 0;
          z-index: 11;
          left: 40px;
        }

        .picker-item {
          height: 32px;
          width: 100%;
          display: grid;
          grid-template-columns: 20px 1fr;
          justify-content: center;
          align-items: center;
          padding: 0 15px;
          gap: 8px;

          &-active {
            background-color: rgba(0, 0, 0, 0.3);
            cursor: pointer;
          }
        }
      `}
      {...props}
    >
      {isShowPicker && (
        <div className="picker">
          {SearchEngineList.map(({ searchEngine, url }, index) => {
            return (
              <div
                key={searchEngine}
                className={`picker-item ${
                  index === currentHoverItemIndex ? "picker-item-active" : ""
                }`}
                onMouseEnter={() => {
                  setCurrentHoverItemIndex(index);
                }}
                onClick={() => {
                  handleSearch(
                    inputValue,
                    SearchEngineList[currentHoverItemIndex].url
                  );
                }}
              >
                {/* <span className="search-value">{inputValue}</span> */}
                {currentSearchIcon(searchEngine)}
                <span className="search-engine-name">{searchEngine}</span>
              </div>
            );
          })}
        </div>
      )}
      <div className="searchbar">
        <div className="searchbar-wrapper">
          <div
            className="searchbar-left"
            onClick={() => {
              setIsShowPicker(true);
            }}
          >
            <img src={googleIcon} />
          </div>

          <div className="searchbar-center">
            <div className="searchbar-input-spacer"></div>
            <input
              className="searchbar-input"
              title="Search"
              placeholder="请输入查询内容"
              onKeyUp={handleKeyUp}
            />
          </div>

          <div className="searchbar-right">
            <div className="search-icon-wrapper">
              <span className="search-icon searchbar-icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"></path>
                </svg>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
