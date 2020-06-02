import React, { useEffect, useState } from "react";
import * as FA from "react-icons/fa";
import { connect } from "react-redux";
import * as actions from "../../Store/Actions";
import SearchForm from "../Search/SearchForm";
let Home = (props) => {
  const [allHomes, setAllHomes] = useState([]);
  useEffect(() => {
    props.getAllHomes();
  }, []);
  useEffect(() => {
    props.allHomes && setAllHomes(props.allHomes);
  }, [props.allHomes]);
  return (
    <div className="col">
      <SearchForm />
      <div>
        <img
          src={require("../../Assets/Images/HD-Room-Backgrounds-.jpg")}
          className="home-img"
        />
      </div>
      <div>
        <div className="card-title">Recently added</div>
        <div className="tab-g-row">
          {allHomes &&
            allHomes
              .reverse()
              .slice(-5)
              .map((home, key) => (
                <div key={key} className="tab-card">
                  <div className="tab-card-container">
                    <div className="tab-card-title">{home.location}</div>
                    <div className="tab-card-body">
                      <div>
                        <label>Avilable Rooms :</label> {home.room_availability}
                      </div>
                      <div>
                        <label>Rooms Size :</label> {home.room_size}
                      </div>
                      <div>
                        <label>Price of Each Room per month :</label>{" "}
                        {home.price}
                      </div>
                      <div>
                        <div>
                          <FA.FaEye className="tab-icon" size="1.6rem" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
        </div>
      </div>
      <div>
        <div className="card-title">All Homes</div>
        <div className="tab-g-row">
          {allHomes &&
            allHomes.map(
              (home, key) =>
                home.room_availability && (
                  <div key={key} className="tab-card">
                    <div className="tab-card-container">
                      <div className="tab-card-title">{home.location}</div>
                      <div className="tab-card-body">
                        <div>
                          <label>Avilable Rooms :</label>{" "}
                          {home.room_availability}
                        </div>
                        <div>
                          <label>Rooms Size :</label> {home.room_size}
                        </div>
                        <div>
                          <label>Price of Each Room per month :</label>{" "}
                          {home.price}
                        </div>
                        <div>
                          <div>
                            <FA.FaEye className="tab-icon" size="1.6rem" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ),
            )}
        </div>
      </div>
    </div>
  );
};
let mapStateToProsp = (state) => {
  return {
    allHomes: state.HomeInfoReducer.allHome,
  };
};
let mapDispatchToProps = (dispatch) => {
  return {
    getAllHomes: () => {
      dispatch(actions.GetAllHomeInfo());
    },
  };
};
export default connect(mapStateToProsp, mapDispatchToProps)(Home);
