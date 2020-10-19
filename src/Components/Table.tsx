import React from "react";
import { guessed } from "../const";
import { GameStore } from "../GameStore";
import { useNotesStore } from "../NotesContext";
import { useRootStore } from "../RootStateContext";
import { equalAny, lengthArr } from "../utils";
import { CardItem } from "./CardItem";

type PropType = {
  time: number;
  getCards: GameStore['getCards']
};

export const Table: React.FC<PropType> = ({ time, getCards }) => {
  const notesStore = useNotesStore();
  const [cards, setCards] = React.useState<Array<string>>([]);

  const [newId, setNewId] = React.useState<string>("");
  const [prevId, setPrevId] = React.useState<string>("");

  const [pause, setPause] = React.useState<boolean>(false);

  const [prevLetter, setPrevLetter] = React.useState<string>("");
  const [newLetter, setNewLetter] = React.useState<string>("");

  const [color, setColor] = React.useState<boolean>(false);
  const [guessedCards, setGuessedCards] = React.useState<Array<string>>([]);

  const [won, setWon] = React.useState<boolean | null>(null);

  React.useEffect(() => {
    setGuessedCards((prev) => [...prev, ...guessed]);
    setTimeout(() => {
      setGuessedCards([]);
    }, 3000);
    setCards(getCards);
  }, [notesStore]);

  React.useEffect(() => {
    let timeout: any;
    if (prevId) {
      setPause(true);

      if (equalAny<string>(prevLetter, newLetter)) {
        setColor(true);
        timeout = setTimeout(() => {
          clearUse();
        }, 1000);

        setGuessedCards((prev) => [...prev, newLetter]);
      } else {
        setColor(false);
        timeout = setTimeout(() => {
          clearUse();
        }, 1000);
      }
    }
    return () => {
      clearTimeout(timeout);
    };
  }, [prevId]);

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
      setId(newId, id);
      setLetter(newLetter, letter);
    }
  };

  const setId = (prev: string, next: string) => {
    setPrevId(prev);
    setNewId(next);
  };

  const setLetter = (prev: string, next: string) => {
    setPrevLetter(prev);
    setNewLetter(next);
  };

  const clearUse = () => {
    setPause(true);
    setPrevId("");
    setNewId("");
    setPause(false);
  };

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
        <h1>Win!</h1>
      ) : (
        <h1>Defeat!</h1>
      )}
    </div>
  );
};
