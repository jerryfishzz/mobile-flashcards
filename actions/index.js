import { removeDeckFromApp, addDeckToApp, getDecks, modifyDecks } from "../utils/api";

export const RECEIVE_DECKS = 'RECEIVE_DECKS'
export const ADD_QUESTION = 'ADD_QUESTION'
export const ADD_DECK = 'ADD_DECK'
export const REMOVE_DECK = 'REMOVE_DECK'

export function receiveDecks(decks) {
  return {
    type: RECEIVE_DECKS,
    decks
  }
}

export function addQuestion(deckId, newQuestion) {
  return {
    type: ADD_QUESTION,
    deckId,
    newQuestion
  }
}

export function handleAddQuestion(deckId, newQuestion, cb) {
  return dispatch => {
    return getDecks()
      .then(decks => {
        const newDecks = {
          ...decks,
          [deckId]: { // Assume only one user operating
            ...decks[deckId],
            questions: [
              ...decks[deckId].questions,
              newQuestion
            ]
          }
        }
        return newDecks
      })
      .then(modifyDecks)
      .then(() => {
        dispatch(addQuestion(deckId, newQuestion))
        cb()
      })
  }
}

function addDeck(newDeck) {
  return {
    type: ADD_DECK,
    newDeck
  }
}

export function handleAddDeck(newDeck) {
  return dispatch => {
    return addDeckToApp(newDeck)
      .then(() => {
        dispatch(addDeck(newDeck))
      })
  }
}

function removeDeck(deckId) {
  return {
    type: REMOVE_DECK,
    deckId
  }
}

export function removeDeckAndGoBack(deckId, cb) {
  return dispatch => {
    dispatch(removeDeck(deckId))
    cb()

    return removeDeckFromApp(deckId)
  }
}