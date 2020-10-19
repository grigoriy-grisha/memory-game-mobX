import React from "react";
import { timeStart } from "../const";
import { Table } from "./Table";
import { Timer } from "./Timer";

export const ContainerGameComponent: React.FC = () => {
  const [time, setTime] = React.useState(timeStart);
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

  return (
    <>
      <Timer time={time} />
      <Table time={time} />
    </>
  );
};
