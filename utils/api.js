import { AsyncStorage } from 'react-native'
import { FLASHCARD_KEY, db } from './helpers';

export function getDecks() {
  return AsyncStorage.getItem(FLASHCARD_KEY)
    .then(res => {
      // console.log(res)
      if (!res) {
        AsyncStorage.setItem(FLASHCARD_KEY, JSON.stringify(db))
          // .then(res => {
          //   console.log(res)
          // })
        return db
      }

      return JSON.parse(res)
    })
}

export function getDeck(deckId) {
  return AsyncStorage.getItem(FLASHCARD_KEY)
    .then(res => {
      // console.log(typeof res)
      const decks = JSON.parse(res)
      // console.log(decks)

      return decks[deckId]
    })
}

export function modifyDecks(newDecks) {
  return AsyncStorage.setItem(FLASHCARD_KEY, JSON.stringify(newDecks))
}

export function addDeckToApp(newDeck) {
  return AsyncStorage.mergeItem(FLASHCARD_KEY, JSON.stringify(newDeck))
}

export function removeDeckFromApp(deckId) {
  return AsyncStorage.getItem(FLASHCARD_KEY)
    .then(JSON.parse)
    .then(decks => 
      Object.keys(decks)
        .filter(item => item !== deckId)
        .reduce((acc, cur) => {
          return {...acc, [cur]: decks[cur]}
        }, {}))
    .then(result => {
      AsyncStorage.setItem(FLASHCARD_KEY, JSON.stringify(result))
      return result
    })
}