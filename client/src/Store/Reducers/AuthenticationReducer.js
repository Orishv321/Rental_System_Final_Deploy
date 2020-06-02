let initState = {
  error_message: null,
  message: null,
  error: false,
  usresInfo: null,
  error_data: [],
};
const AuthenticationReducers = (state = initState, actions) => {
  switch (actions.type) {
    case "ADDED_HOME_OWNERS":
      return { ...state, message: actions.payload.message };
    case "ERROR_AUTHENTICATION":
      return {
        ...state,
        error: true,
        error_data: actions.payload,
      };
    case "LOGIN_AUTHENTICATED":
      return {
        ...state,
        message: actions.payload.message,
        usresInfo: actions.payload.detail,
      };
    case "LOGOUT_AUTHENTICATED":
      return {
        ...state,
        usresInfo: null,
        message: null,
      };
    case "REAUTH":
      return {
        ...state,
        message: actions.payload.message,
        usresInfo: actions.payload.detail,
      };
    default:
      return state;
  }
};
export default AuthenticationReducers;
