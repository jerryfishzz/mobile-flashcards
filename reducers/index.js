import { combineReducers } from 'redux'
import decks from './decks'
import currentDeck from './currentDeck'

export default combineReducers({
  decks,
  currentDeck,
})
