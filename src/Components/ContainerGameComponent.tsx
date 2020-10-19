import { useObserver } from "mobx-react";
import React from "react";
import { useRootStore } from "../RootStateContext";
import { Reset } from "./Reset";
import { Table } from "./Table";
import { Timer } from "./Timer";

export const ContainerGameComponent: React.FC = () => {
  const { gameStore } = useRootStore();
  const [time, setTime] = React.useState(10);
  const timerRef = React.useRef<any>();

  React.useEffect(() => {
    timerRef.current = setInterval(() => {
      setTime((prev) => --prev);
    }, 1000);

    return () => {
      clearInterval(timerRef.current);
    };
  }, []);

  React.useEffect(() => {
    if (!time) {
      clearInterval(timerRef.current);
    }
  }, [time]);

  return useObserver(() => (
    <>
      <Timer time={time} />
      <Table time={time} getCards={gameStore.getCards} />
      <Reset />
    </>
  ));
};
