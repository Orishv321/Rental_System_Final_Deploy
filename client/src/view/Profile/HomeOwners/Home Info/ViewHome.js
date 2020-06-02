import React, { useState, useEffect } from "react";
import AddHomes from "./Components/AddHomes";
import { connect } from "react-redux";
import { FaEye } from "react-icons/fa";
import * as actions from "../../../../Store/Actions";
import ZoomVIew from "./Components/ZoomVIew";
let ViewHome = (props) => {
  const [showView, setShowView] = useState(false);
  const [findUsersHomeInfo, setFindUsersHomeInfo] = useState([]);
  const [view, setView] = useState([]);
  useEffect(() => {
    props.findUsersHomeInfoDispatch();
  }, []);
  useEffect(() => {
    props.findUsersHomeInfo && setFindUsersHomeInfo(props.findUsersHomeInfo);
  }, [props.findUsersHomeInfo]);

  let fullView = (id) => {
    // console.log(id);
    setView(findUsersHomeInfo.filter((userHome) => userHome._id == id));
  };

  return (
    <div className="col">
      <AddHomes />
      <div className="tab-g-row space-evenly ">
        <div className="tab-g-row">
          {findUsersHomeInfo &&
            findUsersHomeInfo.map((userhome, key) => (
              <div className="tab-card" key={key}>
                <div className="tab-card-container">
                  <div className="tab-card-title">{userhome.location}</div>
                  <div className="tab-card-body">
                    <div>
                      <label>Avilable Rooms :</label>{" "}
                      {userhome.room_availability}
                    </div>
                    <div>
                      <label>Rooms Size :</label> {userhome.room_size}
                    </div>
                    <div>
                      <label>Price of Each Room per month :</label>{" "}
                      {userhome.price}
                    </div>
                    <div>
                      <div>
                        <FaEye
                          onClick={() => {
                            setShowView(!showView);
                            fullView(userhome._id);
                          }}
                          className="tab-icon"
                          size="1.6rem"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>

        {showView && (
          <ZoomVIew changeView={() => setShowView(!showView)} viewInfo={view} />
        )}
      </div>
    </div>
  );
};
let mapStateToProps = (state) => {
  return {
    findUsersHomeInfo: state.HomeInfoReducer.userHome,
  };
};
let mapDispatchToProps = (dispatch) => {
  return {
    findUsersHomeInfoDispatch: () => dispatch(actions.FindUsers_HomeInfo()),
    deleatedHomeInfo: (id) => dispatch(actions.Delete_HomeInfo(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ViewHome);
