import { addDeckToApp, removeDeckFromApp, getDecks, modifyDecks } from "../utils/api";
import { addDeck, removeDeck, addQuestion } from "./decks";
import { handleAddStatus, removeStatus, addQuestionStatus } from "./deckStatus";

export function handleAddDeck({ key, entry }) {
  return dispatch => {
    return addDeckToApp({ key, entry })
      .then(() => {
        dispatch(addDeck({ [key]: entry }))
        dispatch(handleAddStatus(key))
      })
  }
}

export function removeDeckAndGoHome(deckId, cb) {
  return dispatch => {
    dispatch(removeDeck(deckId))
    dispatch(removeStatus(deckId))
    cb()

    return removeDeckFromApp(deckId)
  }
}

export function handleAddQuestion(deckId, newQuestion, cb) {
  const { id } = newQuestion

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
        dispatch(addQuestionStatus(deckId, id))
        cb()
      })
  }
}