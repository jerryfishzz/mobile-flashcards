import { getDeck } from "../utils/api";

export const RECEIVE_DECK = 'RECEIVE_DECK'

export function receiveDeck(currentDeck) {
  return {
    type: RECEIVE_DECK,
    currentDeck
  }
}

export function initializeDeck(deckId) {
  return dispatch => {
    return getDeck(deckId)
      .then(deck => {
        const currentDeck = {
          correctChoices: 0,
          answeredQuestions: 0,
          deck: {
            ...deck,
            questions: deck.questions.map(q => ({
              ...q,
              status: {
                userChoice : null,
                zFront: true
              }
            }))
          }
        }

        return dispatch(receiveDeck(currentDeck))
      })
  }
}