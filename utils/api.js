import { AsyncStorage } from 'react-native'

export const uuidv1 = require('uuid/v1')

export const FLASHCARD_KEY = 'Flashcard'

export const db = {
  CommonSense: {
    title: 'Common Sense',
    questions: [
      {
        id: uuidv1(),
        question: 'In southen hemisphere the sun moves across the sky as the direction from east to north and finally to west.',
        type: 'judgement',
        answer: true,
        explaination: ''
      },
      {
        id: uuidv1(),
        question: 'People will have their maximum height at night in a day.',
        type: 'judgement',
        answer: false,
        explaination: ''
      },
      {
        id: uuidv1(),
        question: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus tempus lectus a vulputate bibendum. Nunc finibus mattis tellus at lobortis. Curabitur at lacus dolor. Sed luctus facilisis placerat. Quisque varius tincidunt aliquet. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed blandit, massa sed ullamcorper mollis, neque quam ullamcorper turpis, eu cursus nulla sem sed neque. Aenean rhoncus nulla sit amet mi lacinia, in commodo arcu condimentum. Curabitur lobortis id justo sit amet condimentum. Integer non tristique ligula. Quisque euismod malesuada porta. Maecenas lobortis dictum augue vel cursus. Etiam dapibus iaculis ante vel hendrerit. ',
        answer: false,
        explaination: 'Duis tristique tincidunt nisl vel gravida. In tellus sapien, imperdiet sit amet faucibus tempus, lacinia ac nibh. Donec nec quam consectetur tellus scelerisque sagittis luctus non tellus. Aliquam metus orci, venenatis at velit vel, malesuada pulvinar diam. Maecenas non fermentum nulla, et tempus ligula. Integer eros leo, finibus in nibh nec, dignissim posuere dui. Curabitur vel ligula diam. Proin dui libero, tincidunt nec fermentum tempor, faucibus sed felis. Nullam aliquet velit a nisl tincidunt aliquet. Curabitur blandit scelerisque justo ac tempus. Pellentesque vestibulum consequat libero id gravida. Sed ultricies blandit quam nec mollis. In vehicula mauris ex.'
      }
    ]
  },
  Programming: {
    title: 'Programming',
    questions: [
      {
        id: uuidv1(),
        question: 'Stack is last in first out',
        type: 'judgement',
        answer: true,
        explaination: ''
      },
      {
        id: uuidv1(),
        question: 'In JavaScript the output of {} === null is true',
        type: 'judgement',
        answer: false,
        explaination: ''
      },
      {
        id: uuidv1(),
        question: 'Both in ES5 and ES6, this has the same working mechanism',
        type: 'judgement',
        answer: false,
        explaination: ''
      }
    ]
  }
}

export function getDecks() {
  return AsyncStorage.getItem(FLASHCARD_KEY)
    .then(res => {
      if (!res) {
        AsyncStorage.setItem(FLASHCARD_KEY, JSON.stringify(db))
        return db
      }

      return JSON.parse(res)
    })
}

export function getDeck(deckId) {
  return AsyncStorage.getItem(FLASHCARD_KEY)
    .then(res => {
      const decks = JSON.parse(res)

      return decks[deckId]
    })
}

export function modifyDecks(newDecks) {
  return AsyncStorage.setItem(FLASHCARD_KEY, JSON.stringify(newDecks))
}

export function addDeckToApp({ key, entry }) {
  return AsyncStorage.mergeItem(FLASHCARD_KEY, JSON.stringify({[key]: entry}))
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

