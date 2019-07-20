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

export function addDeck(entry) {
  return {
    type: ADD_DECK,
    entry
  }
}

export function removeDeck(deckId) {
  return {
    type: REMOVE_DECK,
    deckId
  }
}