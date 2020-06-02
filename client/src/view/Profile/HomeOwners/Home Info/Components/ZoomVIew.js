import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import * as actions from "../../../../../Store/Actions";
import { useHistory } from "react-router-dom";
import * as FA from "react-icons/fa";
import ShowUserInfo from "./ShowUserInfo";

let ZoomVIew = (props) => {
  const [editState, setEditState] = useState(false);
  const [view, setView] = useState([]);
  let history = useHistory();
  useEffect(() => {
    setView(props.viewInfo);
  }, [props.viewInfo]);

  let handelChange = (e, key) => {
    let changedValue = view[key];
    changedValue = { ...changedValue, [e.target.name]: e.target.value };
    let newView = view;
    newView[key] = changedValue;
    setView([...newView]);
  };
  return (
    view &&
    view.map((view, key) => (
      <div className="tab-g-row-wide tab-card" key={key}>
        <div className="tab-card-container row">
          <div>
            <div className="tab-card-title">
              {!editState && view.location}
              {editState && (
                <input
                  type="text"
                  name="location"
                  value={view.location}
                  onChange={(e) => handelChange(e, key)}
                />
              )}
            </div>
            <div className="tab-card-body">
              <div>
                <label>Total Rooms :</label>{" "}
                {(!editState && view.total_rooms) || ""}
                {editState && (
                  <input
                    type="text"
                    value={view.total_rooms}
                    name="total_rooms"
                    onChange={(e) => handelChange(e, key)}
                  />
                )}
              </div>
              <div>
                <label>Avilable Rooms :</label>{" "}
                {(!editState && view.room_availability) || ""}
                {editState && (
                  <input
                    type="text"
                    name="room_availability"
                    value={view.room_availability}
                    onChange={(e) => handelChange(e, key)}
                  />
                )}
              </div>
              <div>
                <label>Rooms Size :</label>
                {(!editState && view.room_size) || ""}
                {editState && (
                  <input
                    type="text"
                    name="room_size"
                    value={view.room_size}
                    onChange={(e) => handelChange(e, key)}
                  />
                )}
              </div>
              <div>
                <label>BathRooms :</label> {(!editState && view.bathroom) || ""}
                {editState && (
                  <input
                    type="text"
                    name="bathroom"
                    value={view.bathroom}
                    onChange={(e) => handelChange(e, key)}
                  />
                )}
              </div>
              <div>
                <label>Contact no. :</label>{" "}
                {(!editState && view.phoneNo) || ""}
                {editState && (
                  <input
                    type="text"
                    value={view.phoneNo}
                    name="phoneNo"
                    onChange={(e) => handelChange(e, key)}
                  />
                )}
              </div>
              <div>
                <label>Price of Each Room per month :</label>{" "}
                {(!editState && view.price) || ""}
                {editState && (
                  <input
                    type="text"
                    value={view.price}
                    name="price"
                    onChange={(e) => handelChange(e, key)}
                  />
                )}
              </div>
              <div>
                <label>Parking :</label> {(!editState && view.parking) || ""}
                {editState && (
                  <input
                    type="text"
                    value={view.parking}
                    name="parking"
                    onChange={(e) => handelChange(e, key)}
                  />
                )}
              </div>
              <div>
                <FA.FaEye
                  onClick={props.changeView}
                  className="tab-icon"
                  size="1.6rem"
                />
                <FA.FaTrashAlt
                  onClick={() =>
                    window.confirm(
                      "Do you really want to Delete the home info ??",
                    ) && props.deleatedHomeInfo(view._id)
                  }
                  className="tab-icon"
                  size="1.6rem"
                />

                <FA.FaPen
                  size="1.6rem"
                  className="tab-icon"
                  onClick={() => {
                    setEditState(!editState);
                    editState && props.updateHomeInfo(view._id, view);
                  }}
                />
                <FA.FaUserPlus
                  className="tab-icon"
                  size="1.6rem"
                  onClick={() =>
                    history.push({
                      pathname: "/signup",
                      usersInfo_homeInfo: {
                        _homeInfoID: view._id,
                        _homeOwnersID: localStorage.getItem("homeOwnersID"),
                      },
                    })
                  }
                />
              </div>
            </div>
          </div>

          <div className="right-bar-users">
            <ShowUserInfo homeId={view._id} />
          </div>
        </div>
      </div>
    ))
  );
};

let mapStateToProps = (state) => {
  return {};
};
let mapDispatchToProps = (dispatch) => {
  return {
    deleatedHomeInfo: (id) => dispatch(actions.Delete_HomeInfo(id)),
    updateHomeInfo: (id, data) => dispatch(actions.Update_HomeInfo(id, data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ZoomVIew);
