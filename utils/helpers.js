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
        question: 'Men must love women',
        answer: false,
        explaination: ''
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
