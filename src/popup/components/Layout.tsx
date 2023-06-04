import { css } from "@emotion/react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useRecoilState } from "recoil";
import { useEffect } from "react";

export default function Layout() {
  const location = useLocation();
  const navigator = useNavigate();
  console.log("location", location.pathname);

  return (
    <div
      css={css`
        height: 100%;
      `}
    >
      <main
        css={css`
          height: calc(100% - 50px);
        `}
      >
        <Outlet />
      </main>
    </div>
  );
}
