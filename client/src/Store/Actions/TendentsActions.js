import axios from "axios";
export let GetTendentsFromHomeId = (id) => {
  return (dispatch) => {
    axios
      .get("/api/v/homeId/tendents/" + id)
      .then((result) => {
        // console.log(result);
        dispatch({
          type: "GET_HOME_INFO_TENDENTS",
          payload: result.data,
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({ type: "ERROR_TENDENTS", payload: err });
      });
  };
};
export let GetAllHomeOwnersTendents = (id) => {
  return (dispatch) => {
    axios
      .get("/api/v/homeId/homeOwners/" + localStorage.getItem("homeOwnersID"))
      .then((result) => {
        // console.log(result.data.yourUsers);
        dispatch({ type: "GET_ALL_MYUSERS", payload: result.data.yourUsers });
      })
      .catch((err) => {
        console.log(err);
        dispatch({ type: "ERROR_TENDENTS", payload: err });
      });
  };
};
export let UpdateTendentsInfo = (data) => {
  return (dispatch) => {
    axios
      .put(`/api/v/tendents/${data._id}`, data)
      .then((result) => {
        // console.log(result);
        GetAllHomeOwnersTendents(localStorage.getItem("homeOwnersID"))(
          dispatch,
        );
      })
      .catch((err) => {
        console.log(err);
        dispatch({ type: "ERROR_TENDENTS", payload: err });
      });
  };
};
export let DeleteTendents = (id) => {
  return (dispatch) => {
    axios
      .delete("/api/v/tendents/" + id)
      .then((result) => {
        // console.log(result);
        GetAllHomeOwnersTendents(localStorage.getItem("homeOwnersID"))(
          dispatch,
        );
      })
      .catch((err) => {
        console.log(err);
        dispatch({ type: "ERROR_TENDENTS", payload: err });
      });
  };
};
