import { combineReducers } from 'redux'
import decks from './decks'
import currentDeck from './currentDeck'
import deckStatus from './deckStatus'

export default combineReducers({
  decks,
  // currentDeck,
  deckStatus
})
