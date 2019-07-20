import { combineReducers } from 'redux'
import decks from './decks'
import deckStatus from './deckStatus'

export default combineReducers({
  decks,
  deckStatus
})
