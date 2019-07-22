import { combineReducers } from 'redux'

const codeReducer = (state = '', action) => {
  // eslint-disable-next-line default-case
  switch (action.type) {
    case 'CODE_CHANGE':
      return action.payload
    default:
      return state
  }
}

export default combineReducers({
  code: codeReducer
})
