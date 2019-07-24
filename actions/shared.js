import { addDeckToApp, removeDeckFromApp, getDecks, modifyDecks, getDeck } from "../utils/api";
import { addDeck, removeDeck, addQuestion } from "./decks";
import { handleAddStatus, removeStatus, addQuestionStatus } from "./deckStatus";

export function handleAddDeck({ key, entry }) {
  return async dispatch => {
    try {
      await addDeckToApp({ key, entry })

      dispatch(addDeck({ [key]: entry }))
      dispatch(handleAddStatus(key))
    } catch(err) {
      throw Error('Add deck error')
    }
  }
}

export function removeDeckAndGoHome(deckId, deck, cb) {
  return dispatch => {
    dispatch(removeDeck(deckId))
    dispatch(removeStatus(deckId))
    cb()

    return removeDeckFromApp(deckId)
      .catch(err => {
        dispatch(addDeck({ [deckId]: deck }))
        dispatch(handleAddStatus(deckId))
        throw err
      })
  }
}

export function handleAddQuestion(deckId, newQuestion, cb) {
  const { id } = newQuestion

  return async dispatch => {
    try {
      const decks = await getDecks()
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

      await modifyDecks(newDecks)

      dispatch(addQuestion(deckId, newQuestion))
      dispatch(addQuestionStatus(deckId, id))
      cb()
    } catch(err) {
      throw Error('Add question error')
    }
  }
}