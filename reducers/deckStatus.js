import { RECEIVE_STATUS, INITIALIZE_STATUS, ADD_STATUS, REMOVE_STATUS, ADD_QUESTION_STATUS } from "../actions/deckStatus";

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
    default:
      return state
  }
}