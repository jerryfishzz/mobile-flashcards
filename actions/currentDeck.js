import { getDeck } from "../utils/api";

export const RECEIVE_DECK = 'RECEIVE_DECK'
export const CHOOSE_ANSWER = 'CHOOSE_ANSWER'
export const RESET_DECK = 'RESET_DECK'

function receiveDeck(currentDeck) {
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

function chooseAnswer(userChoice, index) {
  return {
    type: CHOOSE_ANSWER,
    userChoice,
    index
  }
}

export function handleChooseAnswer(userChoice, index, cb) {
  return (dispatch, getState) => {
    dispatch(chooseAnswer(userChoice, index))

    const { currentDeck: { answeredQuestions, deck, correctChoices } } = getState()
    // console.log(answeredQuestions, deck)
    // console.log(getState())
    if (answeredQuestions === deck.questions.length) {
      cb(answeredQuestions, correctChoices)
    }
  }
}

export function resetDeck() {
  return {
    type: RESET_DECK
  }
}