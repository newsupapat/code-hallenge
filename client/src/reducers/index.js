import { combineReducers } from "redux";

const INTIAL_STATE = {
  isSignedIn: false
};

const codeReducer = (state = "", action) => {
  // eslint-disable-next-line default-case
  switch (action.type) {
    case "CODE_CHANGE":
      return action.payload;
    default:
      return state;
  }
};
const UserReducer = (state = INTIAL_STATE, action) => {
  // eslint-disable-next-line default-case
  switch (action.type) {
    case "USER_UPDATE":
      return { ...state, isSignedIn: true, ...action.payload };
    default:
      return state;
  }
};

export default combineReducers({
  code: codeReducer,
  auth: UserReducer
});
