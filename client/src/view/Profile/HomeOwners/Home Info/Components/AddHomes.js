import React from "react";
import { useForm } from "react-hook-form";
import { connect } from "react-redux";
import * as actions from "../../../../../Store/Actions";

let AddHomes = (props) => {
  const { handleSubmit, errors, register } = useForm();
  let handelAddHome = (data) => {
    props.addNewHome(data);
  };
  return (
    <form onSubmit={handleSubmit(handelAddHome)}>
      <div className="tab-form-grid space-evenly">
        <div className="tab-input-div">
          <div className="cols">
            <label className="tab-label"> Total Rooms :</label>{" "}
            <input
              type="number"
              name="total_rooms"
              className="tab-input"
              ref={register({
                required: "Rooms should be Added",
                pattern: {
                  value: /^[0-9]{1,3}$/,
                  message: "should contain Numbers",
                },
              })}
            />
          </div>

          <small className="error-msg">
            {errors.total_rooms && errors.total_rooms.message}
          </small>
        </div>
        <div className="tab-input-div">
          <div className="cols">
            <label className="tab-label"> Available Rooms :</label>{" "}
            <input
              className="tab-input"
              type="number"
              name="room_availability"
              ref={register({
                required: "Available Rooms should be Added",
                pattern: {
                  value: /^[0-9]{1,3}$/,
                  message: "should contain Numbers",
                },
              })}
            />
          </div>
          <small className="error-msg">
            {errors.room_availability && errors.room_availability.message}
          </small>
        </div>
        <div className="tab-input-div">
          <div className="cols">
            <label className="tab-label">Room Size:</label>
            <input
              className="tab-input"
              type="text"
              name="room_size"
              placeholder=" 20*20"
              ref={register({
                required: "Room Size should be Added",
                pattern: {
                  value: /^[#.0-9a-zA-Z\s,*]{2,10}$/,
                  message: "Should contain a valid size",
                },
              })}
            />
          </div>
          <small className="error-msg">
            {errors.room_size && errors.room_size.message}{" "}
          </small>
        </div>
        <div className="tab-input-div">
          <div className="cols">
            <label className="tab-label">BathRooms No:</label>{" "}
            <input
              className="tab-input"
              type="number"
              name="bathroom"
              ref={register({
                required: "Available Rooms should be Added",
                pattern: {
                  value: /^[0-9]{1,3}$/,
                  message: "should contain Numbers",
                },
              })}
            />
          </div>
          <small className="error-msg">
            {errors.bathroom && errors.bathroom.message}{" "}
          </small>
        </div>
        <div className="tab-input-div">
          <div className="cols">
            <label className="tab-label">Location of Home:</label>{" "}
            <input
              className="tab-input"
              type="text"
              name="location"
              placeholder="kathmandu-nepal"
              ref={register({
                required: "Address in required",
                pattern: {
                  value: /^[#.0-9a-zA-Z\s,-]{10,50}$/,
                  message: `Should contain Alphabetes or "-"`,
                },
              })}
            />
          </div>
          <small className="error-msg">
            {errors.location && errors.location.message}
          </small>
        </div>
        <div className="tab-input-div">
          <div className="cols">
            <label className="tab-label">Phone No:</label>{" "}
            <input
              className="tab-input"
              type="text"
              name="phoneNo"
              ref={register({
                required: "The Phone no is empty",
                pattern: {
                  value: /^[0-9]{10,10}$/,
                  message: "The Phone no should contain only 10 numbers",
                },
              })}
            />
          </div>
          <small className="error-msg">
            {errors.phoneNo && errors.phoneNo.message}{" "}
          </small>
        </div>
        <div className="tab-input-div">
          <div className="cols">
            <label className="tab-label">Price Of Each Room:</label>{" "}
            <input
              className="tab-input"
              type="number"
              name="price"
              ref={register({
                required: "Price of Rooms should be Added",
                pattern: {
                  value: /^[0-9]{3,5}$/,
                  message: "should contain Numbers",
                },
              })}
            />
          </div>

          <small className="error-msg">
            {errors.price && errors.price.message}{" "}
          </small>
        </div>
        <div className="tab-input-div">
          <div className="cols">
            <label className="tab-label">Parking:</label>{" "}
            <input
              type="checkbox"
              name="parking"
              value={true}
              ref={register()}
            />
          </div>
        </div>

        <button className="tab-btn-success">Submit</button>
      </div>
    </form>
  );
};

let mapDispatchToProps = (dispatch) => {
  return {
    addNewHome: (data) => dispatch(actions.AddHomeInfo(data)),
  };
};

export default connect(null, mapDispatchToProps)(AddHomes);
