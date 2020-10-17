import React from "react";
import { guessed } from "../const";
import { useNotesStore } from "../NotesContext";
import { CardItem } from "./CardItem";

export const Table = () => {
  const notesStore = useNotesStore();
  const [cards, setCards] = React.useState<Array<string>>([]);

  const [newId, setNewId] = React.useState<string>("");
  const [prevId, setPrevId] = React.useState<string>("");

  const [pause, setPause] = React.useState<boolean>(false);

  const [prevLetter, setPrevLetter] = React.useState<string>("");
  const [newLetter, setNewLetter] = React.useState<string>("");

  const [color, setColor] = React.useState<boolean>(false);
  const [guessedCards, setGuessedCards] = React.useState<Array<string>>([]);

  React.useEffect(() => {
    setGuessedCards((prev) => [...prev, ...guessed]);
    setTimeout(() => {
      setGuessedCards([]);
    }, 3000);
    setCards(notesStore!.mixCards(notesStore!.cards));
  }, [notesStore]);

  React.useEffect(() => {
    let timeout: any;
    if (prevId) {
        
      setPause(true);

      if (prevLetter === newLetter) {
        setColor(true);
        timeout = setTimeout(() => {
          setId();
        }, 1000);

        setGuessedCards((prev) => [...prev, newLetter]);
      } else {
        setColor(false);
        timeout = setTimeout(() => {
          setId();
        }, 1000);
      }
    }
    return () => {
      clearTimeout(timeout);
    };
  }, [prevId]);

  const getLetter = (
    event: React.MouseEvent<HTMLDivElement>,
    id: string,
    letter: string
  ) => {
    if (!pause) {
      setPrevId(newId);
      setNewId(id);
      setPrevLetter(newLetter);
      setNewLetter(letter);
    }
  };

  const setId = () => {
    setPause(true);
    setPrevId("");
    setNewId("");
    setPause(false);
  };
  return (
    <div className="table">
      {cards.map((item: string, index) => (
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
      ))}
    </div>
  );
};
