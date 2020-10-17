import React from "react";

type PropTypes = {
  latter: string;
  newId: string;
  prevId: string;
  id: string;
  color: boolean;
  guessed: boolean;
  pause: boolean;
  onCLickCard: (
    event: React.MouseEvent<HTMLDivElement>,
    id: string,
    latter: string
  ) => void;
};

export const CardItem: React.FC<PropTypes> = ({
  latter,
  onCLickCard,
  prevId,
  newId,
  id,
  color,
  guessed,
  pause,
}) => {
  return (
    <div
      className={`card--item ${
        pause && (id === prevId || id === newId)
          ? color
            ? "green"
            : "red"
          : ""
      }`}
    >
      {id !== prevId && id !== newId && !guessed && (
        <div
          className="hidden"
          onClick={(event: React.MouseEvent<HTMLDivElement>) =>
            onCLickCard(event, id, latter)
          }
        ></div>
      )}
      {latter}
    </div>
  );
};
