export const RECEIVE_DECKS = 'RECEIVE_DECKS'
export const ADD_QUESTION = 'ADD_QUESTION'
export const ADD_DECK = 'ADD_DECK'

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

export function addDeck(key, entry) {
  return {
    type: ADD_DECK,
    key,
    entry
  }
}