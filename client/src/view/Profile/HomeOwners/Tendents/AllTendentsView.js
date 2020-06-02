import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import * as FA from "react-icons/fa";
import BillsView from "./Components/BillsView";
import * as actions from "../../../../Store/Actions";
let AllTendentsView = (props) => {
  const [billsView, setbillsView] = useState(false);
  const [allMyUsers, setAllMyUsers] = useState([]);
  const [oneUses, setOneUses] = useState({});
  useEffect(() => {
    props.getAllHomeOwnersUsers();
  }, []);
  useEffect(() => {
    setAllMyUsers(props.getallMyUsers);
  }, [props.getallMyUsers]);
  return (
    // will have the information of all the tendets so that the use will be able
    // to edit and delete the tendents and also b able to add the bill of the
    // tendents
    <div className="tab-g-row space-evenly ">
      <div className="tab-g-row">
        {allMyUsers &&
          allMyUsers.map((user, key) => (
            <div className="tab-card" key={key}>
              <div className="tab-card-container">
                <div className="tab-card-title">{user.name}</div>
                <div className="tab-card-body">
                  <div>
                    <div>
                      <FA.FaEye
                        onClick={() => {
                          setbillsView(!billsView);
                          setOneUses(user);
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
      {/* ///zoom view */}
      {billsView && (
        <div className="tab-g-row-wide tab-card">
          <BillsView
            changeView={() => setbillsView(!billsView)}
            userInfo={oneUses}
          />
        </div>
      )}
    </div>
  );
};
let mapStateToProps = (state) => {
  return {
    getallMyUsers: state.TendentsReducer.allUsers,
  };
};
let mapDispatchToProps = (dispatch) => {
  return {
    getAllHomeOwnersUsers: () => dispatch(actions.GetAllHomeOwnersTendents()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(AllTendentsView);
