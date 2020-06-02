import axios from "axios";
export let Post_NewBills = (data) => {
  return (dispatch) => {
    axios
      .post(`api/v/bills/${data._id}`, data)
      .then((result) => {
        // console.log(result);
        Get_TendentsBills(data._usersID)(dispatch);
      })
      .catch((err) => {
        console.log(err);
        dispatch({ type: "ERROR_BILLS", error: err });
      });
  };
};
export let Get_TendentsBills = (id) => {
  return (dispatch) =>
    axios
      .get(`api/v/bills/${id}`)
      .then((result) => {
        // console.log(result);
        dispatch({ type: "GET_USERS_BILL", payload: result.data.bills });
      })
      .catch((err) => {
        console.log(err);
        dispatch({ type: "ERROR_BILLS", error: err });
      });
};
export let Delete_Bill_Info = (id, userID) => {
  return (dispatch) => {
    axios
      .delete(`api/v/bills/${id}`)
      .then((result) => {
        // console.log(result);
        Get_TendentsBills(userID)(dispatch);
      })
      .catch((err) => {
        console.log(err);
        dispatch({ type: "ERROR_BILLS", error: err });
      });
  };
};
export let Update_Bill_Info = (id, data) => {
  return (dispatch) => {
    axios
      .put(`api/v/bills/${id}`, data)
      .then((result) => {
        // console.log(result);
        Get_TendentsBills(data._usersID)(dispatch);
      })
      .catch((err) => {
        console.log(err);
        dispatch({ type: "ERROR_BILLS", error: err });
      });
  };
};
