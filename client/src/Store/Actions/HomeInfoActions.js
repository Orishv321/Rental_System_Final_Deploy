import axios from "axios";
export let AddHomeInfo = (data) => {
  return (dispatch) => {
    data = {
      ...data,
      _homeOwnersID: localStorage.getItem("homeOwnersID"),
    };
    axios
      .post("/api/v/homeInfo", data)
      .then((result) => {
        GetAllHomeInfo()(dispatch);
        FindUsers_HomeInfo()(dispatch);
      })
      .catch((err) => {
        console.log(err);
        dispatch({ type: "ERROR_HOMEINFO", payload: err.error });
      });
  };
};

export let GetAllHomeInfo = () => {
  return (dispatch) => {
    axios
      .get("/api/v/homeInfo")
      .then((result) => {
        // console.log(result);
        dispatch({ type: "GET_ALL_HOME", payload: result.data });
      })
      .catch((err) => {
        console.log(err);
        dispatch({ type: "ERROR_HOMEINFO", payload: err.error });
      });
  };
};

export let FindUsers_HomeInfo = () => {
  return (dispatch) => {
    axios
      .get("/api/v/homeInfo/" + localStorage.getItem("homeOwnersID"))
      .then((result) => {
        // console.log(result);
        dispatch({ type: "GET_ALL_USER_HOME", payload: result.data.data });
      })

      .catch((err) => {
        console.log(err);
        dispatch({ type: "ERROR_HOMEINFO", payload: err });
      });
  };
};
export let Delete_HomeInfo = (id) => {
  return (dispatch) => {
    axios
      .delete("/api/v/homeInfo/" + id)
      .then((result) => {
        // console.log(result);
        GetAllHomeInfo()(dispatch);
        FindUsers_HomeInfo()(dispatch);
      })
      .catch((err) => {
        console.log(err);
        dispatch({ type: "ERROR_HOMEINFO", payload: err });
      });
  };
};
export let Update_HomeInfo = (id, data) => {
  return (dispatch) => {
    axios
      .put(`/api/v/homeInfo/${id}`, data)
      .then((result) => {
        // console.log(result);
        GetAllHomeInfo()(dispatch);
        FindUsers_HomeInfo()(dispatch);
      })
      .catch((err) => {
        console.log(err);
        dispatch({ type: "ERROR_HOMEINFO", payload: err });
      });
  };
};
