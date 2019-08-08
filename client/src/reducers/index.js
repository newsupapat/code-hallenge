import { combineReducers } from 'redux'
import _ from 'lodash'

const INTIAL_STATE = {
  isSignedIn: false
}

const codeReducer = (state = '', action) => {
  // eslint-disable-next-line default-case
  switch (action.type) {
    case 'CODE_CHANGE':
      return action.payload
    default:
      return state
  }
}
const UserReducer = (state = INTIAL_STATE, action) => {
  // eslint-disable-next-line default-case
  switch (action.type) {
    case 'USER_UPDATE':
      return { ...state, isSignedIn: true, ...action.payload }
    case 'DESTROY_UPDATE':
      return INTIAL_STATE
    default:
      return state
  }
}
const ProblemReducer = (state = [], action) => {
  switch (action.type) {
    case 'FETCH_PROBLEM':
      return _.mapKeys(action.payload, '_id')
    // case 'DELETE_ID':
    //   return _.omit(state, action.payload)
    default:
      return state
  }
}

export default combineReducers({
  code: codeReducer,
  auth: UserReducer,
  Problem: ProblemReducer
})
