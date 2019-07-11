import { RECEIVE_DECKS, ADD_DECK, ADD_QUESTION } from "../actions";

function decks(state = {}, action) {
  switch (action.type) {
    case RECEIVE_DECKS:
      return {
        ...state,
        ...action.decks
      }
    case ADD_QUESTION:
      return {
        ...state,
        [action.deckId]: {
          ...state[action.deckId],
          questions: [
            ...state[action.deckId].questions,
            action.newQuestion
          ]
        }
      }
    case ADD_DECK:
      return {
        ...state,
        [action.key]: action.entry
      }
    default:
      break;
  }
}

export default decks