import React, { useEffect } from "react";
import NavBar from "../view/NavBar/NavBar";
import routers from "../Routers";
import { connect } from "react-redux";
import * as actions from "../Store/Actions";
import { Route, Switch } from "react-router-dom";
let Layout = (props) => {
  useEffect(() => {
    props.reAuth();
  }, []);
  let call_for_router = routers.map((rout, key) => (
    <Route
      path={rout.path}
      component={rout.component}
      exact={rout.exact}
      key={key}
    />
  ));
  return (
    <>
      <NavBar />
      <main>
        <Switch>{call_for_router}</Switch>
      </main>
    </>
  );
};

let mapDispatchToProps = (dispatch) => {
  return {
    reAuth: () => dispatch(actions.ReAuth()),
  };
};
export default connect(null, mapDispatchToProps)(Layout);
