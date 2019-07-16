export const FLASHCARD_KEY = 'Flashcard'

export const db = {
  CommonSense: {
    title: 'Common Sense',
    questions: [
      {
        question: 'In southen hemisphere the sun moves across the sky as the direction from east to north and finally to west.',
        type: 'judgement',
        answer: true,
        explaination: ''
      },
      {
        question: 'People will have their maximum height at night in a day.',
        type: 'judgement',
        answer: false,
        explaination: ''
      },
      {
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
        question: 'Stack is last in first out',
        type: 'judgement',
        answer: true,
        explaination: ''
      },
      {
        question: 'In JavaScript the output of {} === null is true',
        type: 'judgement',
        answer: false,
        explaination: ''
      },
      {
        question: 'Both in ES5 and ES6, this has the same working mechanism',
        type: 'judgement',
        answer: false,
        explaination: ''
      }
    ]
  }
}
