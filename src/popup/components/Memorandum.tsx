import { Button, CheckList, Input, Popover } from "antd-mobile";
import { HTMLAttributes, useMemo, useState } from "react";
import MemorandumItem from "./MemorandumItem";
import { useRecoilState } from "recoil";
import { memorandumListState } from "../globalState";
import { cloneDeep, set } from "lodash";
import { css } from "@emotion/react";
import { nanoid } from "nanoid";
import Browser from "webextension-polyfill";

export interface MemorandumProps extends HTMLAttributes<HTMLDivElement> {}

type State = "todo" | "done";

export interface MemorandumItem {
  task: string;
  state: State;
  id: string;
}

export default function Memorandum({ ...props }: MemorandumProps) {
  const [memorandumList, setMemorandumList] =
    useRecoilState(memorandumListState);
  const [newTask, setNewTask] = useState<string>();

  const setMemorandumListWithStorage = (
    newMemorandumList: MemorandumItem[]
  ) => {
    if (!newMemorandumList) {
      return;
    }
    setMemorandumList(newMemorandumList);
    Browser.storage.sync.set({ memorandumList: newMemorandumList });
  };

  const memorandumListValue = useMemo(
    () =>
      memorandumList
        .filter((item) => item.state === "done")
        .map((item) => item.id),
    [memorandumList]
  );

  const handleChangeState = (value: string[]) => {
    const preMemorandumList = cloneDeep(memorandumList);
    const newMemorandumList = preMemorandumList.map((item) => {
      if (value.includes(item.id)) {
        item.state = "done";
      } else {
        item.state = "todo";
      }
      return item;
    });
    setMemorandumListWithStorage(newMemorandumList);
  };

  const handleCreateItem = (task?: string) => {
    if (!task) {
      return;
    }
    const newMemorandumList = cloneDeep(memorandumList);
    newMemorandumList.push({
      task,
      state: "todo",
      id: nanoid(),
    });
    setMemorandumListWithStorage(newMemorandumList);
  };

  const handleDelete = (taskId: string) => {
    if (!taskId) {
      return;
    }
    const MemorandumList = cloneDeep(memorandumList);
    const newMemorandumList = MemorandumList.filter(
      (item) => item.id !== taskId
    );
    setMemorandumList(newMemorandumList);
  };

  return (
    <div
      {...props}
      css={css`
        height: 100%;
        display: grid;
        grid-template-rows: 1fr 30px;
        gap: 10px;
        background-color: #ffe2a9;
        border-radius: 10px;
        padding: 4px;
      `}
    >
      <section
        css={css`
          overflow-y: auto;
          height: 100%;
        `}
      >
        <h4>备忘录</h4>
        <CheckList
          multiple
          value={memorandumListValue}
          onChange={handleChangeState}
        >
          {memorandumList.map((item) => (
            <CheckList.Item value={item.id} key={item.id}>
              <MemorandumItem data={item} onDelete={handleDelete} />
            </CheckList.Item>
          ))}
        </CheckList>
      </section>

      <section>
        <Input
          placeholder="新增代办事项"
          value={newTask}
          onChange={setNewTask}
          onBlur={(e) => {
            handleCreateItem(newTask);
            setNewTask("");
          }}
          onEnterPress={(e) => {
            handleCreateItem(newTask);
            setNewTask("");
          }}
          css={css`
            '--color':red ;
            '--placeholder-color':orange ;
            background-color: #c68b16;
            border-radius: 10px;
            padding: 5px 10px;
          `}
          style={{
            "--color": "black",
            "--placeholder-color": "rgba(0,0,0,.3)",
          }}
        />
      </section>
    </div>
  );
}
