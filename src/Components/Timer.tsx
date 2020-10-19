import React from "react";
import { timeStart } from "../const";

type PropType = {
  time: number;
};

export const Timer: React.FC<PropType> = ({ time }) => {
  return (
    <div className="timer">
      <div
        style={{
          height: 5,
          width: time * 6,
          background:
            !(timeStart / 3 > time)
              ? timeStart / 2 > time
                ? "yellow"
                : "green"
              : "red",
        }}
      ></div>
      {time}
    </div>
  );
};
