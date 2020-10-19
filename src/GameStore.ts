import { action, computed, observable } from "mobx";

type latterType = "newLetter" | "prevLetter";
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

  @observable newLetter: string = "";
  @observable prevLetter: string = "";
  @observable newId: string = "";
  @observable prevId: string = "";

  @computed get getuessedCards(): Array<string> {
    return this.guessedCards;
  }

  @action addGuessedCards = (guessed: string) => {
    this.guessedCards.push(guessed);
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

  @action setLetter = (latter: string, type: latterType) => {
    if (type === "newLetter") {
      this.newLetter = latter;
    } else {
      this.prevLetter = latter;
    }
  };

  @action setId = (id: string, type: idType) => {
    if (type === "newId") {
      this.newId = id;
    } else {
      this.prevId = id;
    }
  };

  @computed getId = (type: idType): string => {
    if (type === "newId") {
      return this.newId;
    } else {
      return this.prevId;
    }
  };

  @computed get getCards() {
    return this.cards;
  }

  @computed get getNewId() {
    return this.newId;
  }
  @computed get getPrevId() {
    return this.prevId;
  }

  @computed get getNewLetter() {
    return this.newLetter;
  }
  @computed get getPrevLetter() {
    return this.prevLetter;
  }
}
