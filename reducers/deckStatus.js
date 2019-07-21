import { 
  INITIALIZE_STATUS, 
  ADD_STATUS, 
  REMOVE_STATUS, 
  ADD_QUESTION_STATUS, 
  RESET_DECK, 
  CHOOSE_ANSWER, 
  TOGGLE_Z 
} from "../actions/deckStatus"

export default function deckStatus(state = {}, action) {
  switch (action.type) {
    case INITIALIZE_STATUS:
      return {
        ...action.status
      }
    case ADD_STATUS:
      return {
        ...state,
        ...action.entry
      }
    case REMOVE_STATUS:
      return Object.keys(state).filter(item => item !== action.key)
        .reduce((acc, cur) => {
          return {
            ...acc, 
            [cur]: state[cur]
          }
        }, {})
    case ADD_QUESTION_STATUS:
      return {
        ...state,
        [action.key]: {
          ...state[action.key],
          questions: [
            ...state[action.key].questions,
            {
              id: action.questionId,
              userChoice : null,
              zFront: true
            }
          ]
        }
      }
    case CHOOSE_ANSWER:
      return {
        ...state,
        [action.key]: {
          answeredQuestions: state[action.key].answeredQuestions + 1,
          correctChoices: action.userChoice === action.correctAnswer
            ? state[action.key].correctChoices + 1
            : state[action.key].correctChoices,
          questions: state[action.key].questions.map(q => {
            if (q.id === action.id) {
              return {
                ...q,
                userChoice: action.userChoice
              }
            }
            return q
          })
        }
      }
    case RESET_DECK:
      return {
        ...state,
        [action.deckId]: {
          answeredQuestions: 0,
          correctChoices: 0,
          questions: state[action.deckId].questions.map(q => ({
            ...q,
            userChoice : null,
            zFront: true
          }))
        }
      }
    case TOGGLE_Z:
      return {
        ...state,
        [action.deckId]: {
          ...state[action.deckId],
          questions: state[action.deckId].questions.map(q => {
            if (q.id === action.qid) {
              return {
                ...q,
                zFront: !q.zFront
              }
            }
            return q
          })
        }
      }
    default:
      return state
  }
}