import { RECEIVE_DECK, CHOOSE_ANSWER, RESET_DECK, TOGGLE_ZFRONT } from "../actions/currentDeck";

export default function currentDeck(state = {}, action) {
  switch (action.type) {
    case RECEIVE_DECK:
      return {
        ...action.currentDeck
      }
    case CHOOSE_ANSWER:
      return {
        ...state,
        deck: {
          ...state.deck,
          questions: state.deck.questions.map((q, i) => {
            if (i === action.index) {
              return {
                ...q,
                status: {
                  ...q.status,
                  userChoice: action.userChoice
                }
              }
            }
            return q
          })
        },
        answeredQuestions: state.answeredQuestions + 1,
        correctChoices: state.deck.questions[action.index].answer === action.userChoice
          ? state.correctChoices + 1
          : state.correctChoices
      }
    case RESET_DECK:
      return {
        correctChoices: 0,
        answeredQuestions: 0,
        deck: {
          ...state.deck,
          questions: state.deck.questions.map(q => ({
            ...q,
            status: {
              userChoice : null,
              zFront: true
            }
          }))
        }
      }
    case TOGGLE_ZFRONT:
      return {
        ...state,
        deck: {
          ...state.deck,
          questions: state.deck.questions.map((q, i) => {
            if (i === action.index) {
              return {
                ...q,
                status: {
                  ...q.status,
                  zFront: !state.deck.questions[action.index].status.zFront
                }
              }
            }
            return q
          })
        },
      }
    default:
      return state
  }
} 