import { RECEIVE_DECK } from "../actions/currentDeck";

export default function currentDeck(state = {}, action) {
  switch (action.type) {
    case RECEIVE_DECK:
      return {
        ...action.currentDeck
      }
    default:
      return state
  }
} 