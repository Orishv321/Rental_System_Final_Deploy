import axios from "axios";
let addingUsers = (dispatch, data) => {
  axios
    .post("/api/v/newUser", data)
    .then((result) => {
      dispatch({ type: "ADDED_HOME_OWNERS", payload: result.data });
      // console.log(result);
    })
    .catch((err) => {
      console.log(err);
      dispatch({ type: "ERROR_AUTHENTICATION", payload: err });
    });
};
export let AddHomeOwners = (data) => {
  return (dispatch) => {
    data.userType = 2;
    // console.table(data);
    addingUsers(dispatch, data);
  };
};
export let LoginUsers = (data) => {
  return (dispatch) => {
    axios
      .post("/api/v/newUser/login", data)
      .then((result) => {
        // console.log(result);
        if (result.data.detail) {
          localStorage.setItem("username", result.data.detail.userName);
          localStorage.setItem("token", result.data.detail.token);
          localStorage.setItem("type", result.data.detail.type);
          localStorage.setItem("userId", result.data.detail.userId);
          result.data.detail.homeOwnersID &&
            localStorage.setItem(
              "homeOwnersID",
              result.data.detail.homeOwnersID,
            );
        }

        dispatch({ type: "LOGIN_AUTHENTICATED", payload: result.data });
      })
      .catch((err) => {
        console.log(err);
        dispatch({ type: "ERROR_AUTHENTICATION", payload: err });
      });
  };
};
export let Logout = () => {
  return (dispatch) => {
    localStorage.clear("username");
    localStorage.clear("token");
    localStorage.clear("type");
    localStorage.clear("userId");
    localStorage.clear("homeOwnersID");
    dispatch({ type: "LOGOUT_AUTHENTICATED" });
  };
};
export let ReAuth = () => {
  return (dispatch) => {
    axios
      .post("/api/v/newUser/reAuth", {
        user_token: localStorage.getItem("token"),
      })
      .then((result) => {
        // console.log(result);
        if (result.data.detail) {
          localStorage.setItem("username", result.data.detail.userName);
          localStorage.setItem("token", result.data.detail.token);
          localStorage.setItem("type", result.data.detail.type);
        }
        dispatch({ type: "REAUTH", payload: result.data });
      })
      .catch((err) => {
        console.log(err);
        dispatch({ type: "ERROR_AUTHENTICATION", payload: err });
      });
  };
};
export let AddTendents = (data) => {
  return (dispatch) => {
    // console.log("from the Tendents");
    data.userType = 3;
    // console.table(data);
    addingUsers(dispatch, data);
  };
};
