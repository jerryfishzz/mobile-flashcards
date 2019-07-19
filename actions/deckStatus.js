export const INITIALIZE_STATUS = 'INITIALIZE_STATUS'
export const ADD_STATUS = 'ADD_STATUS'
export const REMOVE_STATUS = 'REMOVE_STATUS'
export const ADD_QUESTION_STATUS = 'ADD_QUESTION_STATUS'

function initializeStatus(status) {
  return {
    type: INITIALIZE_STATUS,
    status
  }
}

export function handleInitializeStatus(decks) {
  return dispatch => {
    const status = Object.keys(decks).reduce((acc, cur) => {
      return {
        ...acc,
        [cur]: {
          correctChoices: 0,
          answeredQuestions: 0,
          questions: decks[cur].questions.map(q => ({
            id: q.id,
            userChoice : null,
            zFront: true
          }))
        }
      }
    }, {})

    dispatch(initializeStatus(status))
  }
}

function addStatus(entry) {
  return {
    type: ADD_STATUS,
    entry
  }
}

export function handleAddStatus(key) {
  return dispatch => {
    const newStatus = {
      [key]: {
        correctChoices: 0,
        answeredQuestions: 0,
        questions: []
      }
    }

    dispatch(addStatus(newStatus))
  }
}

export function removeStatus(key) {
  return {
    type: REMOVE_STATUS,
    key
  }
}

export function addQuestionStatus(key, questionId) {
  return {
    type: ADD_QUESTION_STATUS,
    key,
    questionId
  }
}