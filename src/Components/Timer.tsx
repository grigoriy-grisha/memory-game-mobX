import React from "react";

type PropType = {
  time: number;
};

export const Timer: React.FC<PropType> = ({ time }) => {
  return <div>{time}</div>;
};
