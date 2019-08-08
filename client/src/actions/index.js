import axios from 'axios'
export const UpdateCode = code => {
  // Return an action
  return {
    type: 'CODE_CHANGE',
    payload: code
  }
}
export const UpdateUser = User => {
  return {
    type: 'USER_UPDATE',
    payload: User
  }
}
export const DestroyUser = () => {
  return {
    type: 'DESTROY_UPDATE'
  }
}
export const fetchProblem = () => async dispatch => {
  try {
    const response = await axios.get('api/problem')
    if (response.status === 200) {
      dispatch({ type: 'FETCH_PROBLEM', payload: response.data })
    }
  } catch (error) {
    console.error(error)
  }
}