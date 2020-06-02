let initState = {
  allHome: null,
  userHome: null,
  message: null,
  error: false,
  error_msg: null,
};
let HomeInfoReducer = (state = initState, actions) => {
  switch (actions.type) {
    case "GET_ALL_HOME":
      return {
        ...state,
        allHome: actions.payload.allHomes,
        message: actions.payload.message,
      };
    case "GET_ALL_USER_HOME":
      return {
        ...state,
        userHome: actions.payload,
        message: actions.payload.message,
      };
    case "ERROR_HOMEINFO ":
      return {
        ...state,
        error_msg: actions.payload.error,
        error: true,
      };
    default:
      return state;
  }
};
export default HomeInfoReducer;
