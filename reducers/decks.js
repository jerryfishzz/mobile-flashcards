import { 
  RECEIVE_DECKS, 
  ADD_DECK, 
  ADD_QUESTION, 
  REMOVE_DECK 
} from "../actions/decks";

function decks(state = null, action) { // null means the default state
  switch (action.type) {
    case RECEIVE_DECKS:
      return {
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
        ...action.entry
      }
    case REMOVE_DECK:
      return Object.keys(state).filter(item => item !== action.deckId)
        .reduce((acc, cur) => {
          return {...acc, [cur]: state[cur]}
        }, {})
    default:
      return state
  }
}

export default decks