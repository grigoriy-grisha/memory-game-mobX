import { useObserver } from "mobx-react";
import React from "react";
import { guessed } from "../const";
import { useRootStore } from "../RootStateContext";
import { equalAny, lengthArr } from "../utils";
import { CardItem } from "./CardItem";

type PropType = {
  time: number;
};

export const Table: React.FC<PropType> = ({ time }) => {
  const { gameStore } = useRootStore();

  const timeoutRef = React.useRef<any>();

  const {
    prevId,
    newId,
    setId,
    mixCards,
    addGuessedCards,
    clearGuessedCards,
    guessedCards,
    cards,
  } = gameStore;

  const [pause, setPause] = React.useState<boolean>(false);

  const [prevLetter, setPrevLetter] = React.useState<string>("");
  const [newLetter, setNewLetter] = React.useState<string>("");

  const [color, setColor] = React.useState<boolean>(false);

  const [won, setWon] = React.useState<boolean | null>(null);

  React.useEffect(() => {
    addGuessedCards(guessed);
    const timeot = setTimeout(() => {
      clearGuessedCards();
    }, 3000);
    mixCards();

    return () => {
      clearTimeout(timeot);
    };
  }, []);

  React.useEffect(() => {
    if (prevId) {
      setPause(true);

      if (equalAny<string>(prevLetter, newLetter)) {
        setColor(true);
        timeoutRef.current = setTimeout(() => {
          сlearUse();
        }, 1000);
        addGuessedCards(newLetter);
      } else {
        setColor(false);
        timeoutRef.current = setTimeout(() => {
          сlearUse();
        }, 1000);
      }
    }
    return () => {
      clearTimeout(timeoutRef.current);
    };
  }, [prevId, addGuessedCards, newLetter, prevLetter]);

  React.useEffect(() => {
    if (
      !time &&
      !equalAny<number>(lengthArr(guessedCards), lengthArr(guessed))
    ) {
      setWon(false);
    }
  }, [time]);

  React.useEffect(() => {
    if (time && equalAny<number>(lengthArr(guessedCards), lengthArr(guessed))) {
      setWon(true);
    }
  }, [prevId]);
  

  const getLetter = (
    event: React.MouseEvent<HTMLDivElement>,
    id: string,
    letter: string
  ) => {
    if (!pause) {
      setId(newId, "prevId");
      setId(id, "newId");
      setPrevLetter(newLetter);
      setNewLetter(letter);
    }
  };

  const сlearUse = () => {
    setPause(true);
    setId("", "prevId");
    setId("", "newId");
    setPause(false);
  };
  return useObserver(() => {
    return (
      <div className="table">
        {won === null && !won ? (
          cards.map((item: string, index) => (
            <CardItem
              pause={pause}
              guessed={guessedCards.includes(item)}
              color={color}
              id={`${item}_${index}`}
              newId={newId}
              prevId={prevId}
              onCLickCard={getLetter}
              key={`${item}_${index}`}
              latter={item}
            />
          ))
        ) : won ? (
          <h1 className="green">Win!</h1>
        ) : (
          <h1 className="red">Defeat!</h1>
        )}
      </div>
    );
  });
};
