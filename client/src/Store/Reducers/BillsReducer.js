let initState = {
  error_state: false,
  error: null,
  message: null,
  bills: null,
};

let BillsReducer = (state = initState, actions) => {
  switch (actions.type) {
    case "GET_USERS_BILL":
      return { ...state, bills: actions.payload };
    case "ERROR_BILLS":
      return { ...state, error: actions.payload, error_state: true };
    default:
      return state;
  }
};
export default BillsReducer;
