let initState = {
  message: null,
  error: false,
  users: null,
  error_data: null,
  allUsers: null,
};

const TendentsReducer = (state = initState, actions) => {
  switch (actions.type) {
    case "GET_HOME_INFO_TENDENTS":
      return {
        ...state,
        message: actions.payload.message,
        users: actions.payload.tenUsers,
      };
    case "GET_ALL_MYUSERS":
      return { ...state, allUsers: actions.payload };
    case "ERROR_TENDENTS":
      return {
        ...state,
        message: actions.payload,
        error: true,
        error_data: actions.payload.error,
      };
    default:
      return state;
  }
};
export default TendentsReducer;
