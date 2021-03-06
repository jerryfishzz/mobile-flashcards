export const INITIALIZE_STATUS = 'INITIALIZE_STATUS'
export const ADD_STATUS = 'ADD_STATUS'
export const REMOVE_STATUS = 'REMOVE_STATUS'
export const ADD_QUESTION_STATUS = 'ADD_QUESTION_STATUS'
export const CHOOSE_ANSWER = 'CHOOSE_ANSWER'
export const RESET_DECK = 'RESET_DECK'
export const TOGGLE_Z = 'TOGGLE_Z'
export const RESET_Z = 'RESET_Z'

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

function chooseAnswer(userChoice, id, key) {
  return {
    type: CHOOSE_ANSWER,
    userChoice,
    id,
    key,
  }
}

export function handleChooseAnswer(userChoice, id, key, cb) {
  return (dispatch, getState) => {
    dispatch(chooseAnswer(userChoice, id, key))

    const { deckStatus } = getState()
    const { correctChoices, answeredQuestions, questions } = deckStatus[key]
    
    // All the questions have been answered
    if (answeredQuestions === questions.length) {
      cb(answeredQuestions, correctChoices)
    }
  }
}

export function resetDeck(deckId) {
  return {
    type: RESET_DECK,
    deckId
  }
}

function toggleZ(deckId, qid) {
  return {
    type: TOGGLE_Z,
    deckId,
    qid
  }
}

export function handleToggleZ(deckId, qid, cb) {
  return dispatch => {
    dispatch(toggleZ(deckId, qid))
    cb()
  }
}

export function resetZ(deckId) {
  return {
    type: RESET_Z,
    deckId
  }
}