import { AsyncStorage } from 'react-native'

export const uuidv1 = require('uuid/v1') //UUID generator

export const FLASHCARD_KEY = 'Flashcard:stackcard'

// Dummy data to run the app.
export const db = {
  CommonSense: {
    title: 'Common Sense',
    questions: [
      {
        id: 'CommonSense1',
        question: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus tempus lectus a vulputate bibendum. Nunc finibus mattis tellus at lobortis. Curabitur at lacus dolor. Sed luctus facilisis placerat. Quisque varius tincidunt aliquet. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed blandit, massa sed ullamcorper mollis, neque quam ullamcorper turpis, eu cursus nulla sem sed neque. Aenean rhoncus nulla sit amet mi lacinia, in commodo arcu condimentum. Curabitur lobortis id justo sit amet condimentum. Integer non tristique ligula. Quisque euismod malesuada porta. Maecenas lobortis dictum augue vel cursus. Etiam dapibus iaculis ante vel hendrerit. ',
        answer: 'Duis tristique tincidunt nisl vel gravida. In tellus sapien, imperdiet sit amet faucibus tempus, lacinia ac nibh. Donec nec quam consectetur tellus scelerisque sagittis luctus non tellus. Aliquam metus orci, venenatis at velit vel, malesuada pulvinar diam. Maecenas non fermentum nulla, et tempus ligula. Integer eros leo, finibus in nibh nec, dignissim posuere dui. Curabitur vel ligula diam. Proin dui libero, tincidunt nec fermentum tempor, faucibus sed felis. Nullam aliquet velit a nisl tincidunt aliquet. Curabitur blandit scelerisque justo ac tempus. Pellentesque vestibulum consequat libero id gravida. Sed ultricies blandit quam nec mollis. In vehicula mauris ex.'
      },
      {
        id: 'CommonSense2',
        question: 'People will have their maximum height at night in a day.',
        answer: 'When during the night we’re lying on our bed, our spine is not affected by the pressure of the body weight, and consequently the intervertebral discs relax and stretch.'
      },
      {
        id: 'CommonSense3',
        question: 'In southen hemisphere the sun moves across the sky as the direction from east to north and finally to west.',
        answer: 'Nope. In the southern hemisphere, the Sun (as well as the Moon and the stars) still rises in the East and sets in the West. This is because the "movement" of the Sun in the sky is caused by the Earth\'s rotation, and the northern and southern hemispheres are obviously rotating in the same direction.'
      }
    ]
  },
  Programming: {
    title: 'Programming',
    questions: [
      {
        id: 'Programming1',
        question: 'Stack is last in first out',
        answer: 'Yes. That\'s the feature of stack. Queue is first in first out.'
      },
      {
        id: 'Programming2',
        question: 'In JavaScript the output of {} === null is true',
        answer: 'No. In JS, empty object is not null. Even for partial equal ==, empty object is also not null.'
      },
      {
        id: 'Programming3',
        question: 'Both in ES5 and ES6, this has the same working mechanism',
        answer: 'No. ES6 makes this more straightforward. Try to write a function seperately with traditional ES5 way and then ES6 fat arrow =>. Check the differences.'
      }
    ]
  }
}

export async function getDecks() {
  const res = await AsyncStorage.getItem(FLASHCARD_KEY)

  if (!res) {
    AsyncStorage.setItem(FLASHCARD_KEY, JSON.stringify(db))
    return db
  }

  return JSON.parse(res)
}

export async function getDeck(deckId) {
  const res = await AsyncStorage.getItem(FLASHCARD_KEY)

  const decks = JSON.parse(res)
  return decks[deckId]
}

export function modifyDecks(newDecks) {
  return AsyncStorage.setItem(FLASHCARD_KEY, JSON.stringify(newDecks))
}

export function addDeckToApp({ key, entry }) {
  return AsyncStorage.mergeItem(FLASHCARD_KEY, JSON.stringify({[key]: entry}))
}

export async function removeDeckFromApp(deckId) {
  const res = await AsyncStorage.getItem(FLASHCARD_KEY)
  const decks = JSON.parse(res)
  const result = Object.keys(decks).filter(item => item !== deckId)
    .reduce((acc, cur) => {
      return {...acc, [cur]: decks[cur]}
    }, {})

  AsyncStorage.setItem(FLASHCARD_KEY, JSON.stringify(result))
  return result
}