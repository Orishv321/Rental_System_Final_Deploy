import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import * as FA from "react-icons/fa";
import BillsTableView from "./BillsTableView";
import * as actions from "../../../../../Store/Actions";
let BillsView = (props) => {
  const [user, setUser] = useState({});
  const [enableEdit, setEnableEdit] = useState(false);
  useEffect(() => {
    setUser(props.userInfo);
  }, [props.userInfo]);
  let handeledit = (e) => {
    // value = ;
    // console.log(value);
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  return (
    <div className="tab-card-container col">
      <div>
        <div className="tab-card-title">
          <div>
            <FA.FaEye
              onClick={props.changeView}
              className="tab-icon"
              size="1.6rem"
            />
            <FA.FaTrashAlt
              onClick={() =>
                window.confirm(
                  `Do your want to delete the user ${user.name} ?`,
                ) && props.delteTendents(user._id)
              }
              className="tab-icon"
              size="1.6rem"
            />

            <FA.FaPen
              onClick={() => {
                setEnableEdit(!enableEdit);
                enableEdit && props.updateTendents(user);
              }}
              size="1.6rem"
              className="tab-icon"
            />
            <FA.FaMoneyBillWave className="tab-icon" size="1.6rem" />
          </div>
        </div>
        {user && (
          <div className="tab-card-body tab-g-row">
            <div>
              <label>Name :</label>
              {!enableEdit && user.name}
              {enableEdit && (
                <input
                  type="text"
                  name="name"
                  value={user.name}
                  onChange={handeledit}
                />
              )}
            </div>
            <div>
              <label>Email :</label> {!enableEdit && user.email}
              {enableEdit && (
                <input
                  type="text"
                  name="email"
                  value={user.email}
                  onChange={handeledit}
                />
              )}
            </div>
            <div>
              <label>Phone No :</label>
              {!enableEdit && user.phoneNo}
              {enableEdit && (
                <input
                  type="text"
                  name="phoneNo"
                  value={user.phoneNo}
                  onChange={handeledit}
                />
              )}
            </div>
            <div>
              <label>UserName :</label>
              {!enableEdit && user.userName}
              {enableEdit && (
                <input
                  type="text"
                  name="userName"
                  value={user.userName}
                  onChange={handeledit}
                />
              )}
            </div>
          </div>
        )}
      </div>
      {/* //for the bills info only */}
      <div className="border-around">
        {/* //Table infos add and view info */}
        <BillsTableView usersInfo={user} />
      </div>
    </div>
  );
};
let mapStateToprops = (status) => {
  return {};
};
let mapDispatchToProps = (dispatch) => {
  return {
    updateTendents: (data) => dispatch(actions.UpdateTendentsInfo(data)),
    delteTendents: (id) => dispatch(actions.DeleteTendents(id)),
  };
};
export default connect(mapStateToprops, mapDispatchToProps)(BillsView);
