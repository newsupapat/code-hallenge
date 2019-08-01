export const UpdateCode = code => {
  // Return an action
  return {
    type: "CODE_CHANGE",
    payload: code
  };
};
export const UpdateUser = User => {
  return {
    type: "USER_UPDATE",
    payload: User
  };
};
