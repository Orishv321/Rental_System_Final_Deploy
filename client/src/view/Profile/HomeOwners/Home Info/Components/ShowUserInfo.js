import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import * as Fa from "react-icons/fa";
import * as actions from "../../../../../Store/Actions";

let ShowUserInfo = (props) => {
  const [yourTendents, setYourTendents] = useState([]);
  useEffect(() => {
    props.getHomeTendents(props.homeId);
  }, []);
  useEffect(() => {
    props.yourTendents && setYourTendents(props.yourTendents);
  }, [props.yourTendents]);
  return (
    <div className="tab-card">
      {yourTendents &&
        yourTendents.map((yt, key) => (
          <div className="tab-card-container" key={key}>
            <div className="tab-card-title">{yt.name}</div>
            <div className="tab-card-body">
              <div className="row">
                <label>
                  <Fa.FaPhone /> Phone no. :
                </label>{" "}
                {yt.phoneNo}
              </div>
              <div className="row">
                <label>
                  <Fa.FaAt /> Email :
                </label>{" "}
                {yt.email}
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};
let mapStateToProps = (state) => {
  return {
    yourTendents: state.TendentsReducer.users,
  };
};
let mapDispatchToProsp = (dispatch) => {
  return {
    getHomeTendents: (homeID) =>
      dispatch(actions.GetTendentsFromHomeId(homeID)),
  };
};

export default connect(mapStateToProps, mapDispatchToProsp)(ShowUserInfo);
