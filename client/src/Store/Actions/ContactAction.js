import axios from "axios";

export let AddContact = (data) => {
  return (dispatch) => {
    axios
      .post("/api/v/contact", data)
      .then((result) => {
        // console.log(result);
        GetAllContact()(dispatch);
      })
      .catch((err) => {
        console.log(err);
        dispatch({ type: "ERROR_CONTACT", error: err });
      });
  };
};
export let GetAllContact = () => {
  return (dispatch) => {
    axios
      .get("/api/v/contact")
      .then((result) => {
        // console.log(result);
        dispatch({ type: "ALL_CONTACT", payload: result.data.contacts });
      })
      .catch((err) => {
        console.log(err);
        dispatch({ type: "ERROR_CONTACT", error: err });
      });
  };
};
