import { action, observable } from "mobx";
import { act } from "react-dom/test-utils";

type idType = "newId" | "prevId";

export class GameStore {
  @observable guessedCards: Array<string> = [];
  @observable cards: Array<string> = [
    "A",
    "A",
    "B",
    "B",
    "C",
    "C",
    "D",
    "D",
    "F",
    "F",
    "J",
    "J",
    "H",
    "H",
    "G",
    "G",
    "U",
    "U",
  ];
  @observable newId: string = "";
  @observable prevId: string = "";

  @action addGuessedCards = (guessed: string | Array<string>) => {
    if (Array.isArray(guessed)) {
      this.guessedCards = [...this.guessedCards, ...guessed];
    } else {
      this.guessedCards = [...this.guessedCards, guessed];
    }
  };

  @action clearGuessedCards = () => {
    this.guessedCards = [];
  };

  @action mixCards = () => {
    for (let i = this.cards.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));

      [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
    }
    return this.cards;
  };

  @action setId = (id: string, type: idType) => {
    if (type === "newId") {
      this.newId = id;
    } else {
      this.prevId = id;
    }
  };
}
