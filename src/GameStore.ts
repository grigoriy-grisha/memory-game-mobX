
import { action, computed, observable } from "mobx";

export class GameStore {

    @observable guessedCards: Array<string> = [] 
    @observable cards: Array<string> =  ['A', 'A', 'B', 'B','C', 'C','D', 'D','F', 'F','J', 'J','H', 'H','G', 'G','U', 'U']
    @observable newLatter: string = ''
    @observable prevLatter: string =  ''

    @computed get getuessedCards(): Array<string> {
        return this.guessedCards
    }
    @action addGuessedCards = (guessed: string) => {
        this.guessedCards.push(guessed)
    }
    @action clearGuessedCards = () => {
        this.guessedCards = []
    }
    @computed get getCards() {
        return this.cards
    }
}