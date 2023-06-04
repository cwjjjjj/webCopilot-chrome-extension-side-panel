import { HTMLAttributes } from "react";
import { MemorandumItem as MemorandumItemType } from "./Memorandum";
import { css } from "@emotion/react";
import { CloseCircleOutline } from "antd-mobile-icons";

export interface MemorandumItemProps extends HTMLAttributes<HTMLDivElement> {
  data: MemorandumItemType;
  onDelete: (id: string) => void;
}

export default function MemorandumItem({
  data,
  onDelete: handleDelete,
  ...props
}: MemorandumItemProps) {
  if (!data) {
    return null;
  }

  const { task, state, id } = data ?? {};

  return (
    <div
      {...props}
      css={css`
        display: grid;
        grid-template-columns: 1fr 20px;
        align-items: center;

        .task-done {
          text-decoration: line-through;
        }

        .popover-icon {
          position: relative;
          height: 20px;
          width: 20px;

          &:hover::after {
            content: "删除";
            position: absolute;
            left: -10px;
            top: 50%;
            white-space: nowrap;
            transform: translate(-100%, -50%);
            color: rgba(255, 255, 255, 0.8);
            background-color: rgba(0, 0, 0, 0.3);
            border-radius: 4px;
            padding: 2px 4px;
          }
        }
      `}
    >
      <h5 className={state === "done" ? "task-done" : ""}>{task}</h5>
      <div className="popover-icon">
        <CloseCircleOutline
          color="red"
          onClick={(e) => {
            e.stopPropagation();
            handleDelete(id);
          }}
        />
      </div>
    </div>
  );
}
