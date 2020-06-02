let initState = {
  allContacts: null,
  error: false,
  message: null,
  error_data: null,
};
let ContactReducer = (state = initState, actions) => {
  switch (actions.type) {
    case "ALL_CONTACT":
      return { ...state, allContacts: actions.payload };
    case "ERROR_CONTACT":
      return { ...state, error: true, error_data: actions.error };
    default:
      return state;
  }
};

export default ContactReducer;
