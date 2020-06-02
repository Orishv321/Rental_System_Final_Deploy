import React, { useEffect } from "react";
import { connect } from "react-redux";
import * as actions from "../../../Store/Actions";
import { useHistory } from "react-router-dom";

let Logout = (props) => {
  const history = useHistory();
  useEffect(() => {
    props.logout();
    history.push("/register");
  }, []);
  return <div></div>;
};
let mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(actions.Logout()),
  };
};
export default connect(null, mapDispatchToProps)(Logout);
