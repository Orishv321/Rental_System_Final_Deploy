import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import login from "../../../Assets/Images/undraw_step_to_the_sun_nxqq.svg";
import profile from "../../../Assets/Images/undraw_female_avatar_w3jk.svg";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import {
  FaLock,
  FaUserLock,
  FaUser,
  FaAt,
  FaMobile,
  FaCheckDouble,
  FaExclamationCircle,
} from "react-icons/fa";

import * as actions from "../../../Store/Actions";

let Signup = (props) => {
  const { register, errors, handleSubmit } = useForm();
  const [msg, setMsg] = useState();
  const [alertMessage, setAlertMessage] = useState();
  const [ConPass, setConPass] = useState({
    pass: null,
    con: null,
    msg: false,
  });

  const history = useHistory();

  //Frot alert message
  useEffect(() => {
    localStorage.getItem("homeOwnersID")
      ? setAlertMessage("Adding new Tendents")
      : setAlertMessage(
          "The Signup form is only for the HomeOwners to add the home information",
        );
  }, []);

  useEffect(() => {
    // props.addUsersState && props.addUsersState === "Inserted"
    //   ? props.changePage()
    //   : setMsg(props.addUsersState);

    props.addUsersState && props.addUsersState === "Inserted"
      ? props.location && props.location.pathname === "/signup"
        ? history.push("/profile")
        : props.changePage()
      : setMsg(props.addUsersState);
  }, [props.addUsersState]);
  let signupHandel = (data) => {
    // console.log(data);
    if (localStorage.getItem("homeOwnersID")) {
      data._homeOwnerID = props.location.usersInfo_homeInfo._homeOwnersID;
      data._homeInfoID = props.location.usersInfo_homeInfo._homeInfoID;
      // console.log(data)
      props.addNewTendentDispatch(data);
    } else {
      props.addUsersDispatch(data);
    }
  };
  let handelConPass = (e) => {
    ConPass.pass !== e.target.value && setConPass({ msg: true });
  };

  return (
    <div className=" g-row">
      <div className=" rightimg space-evenly">
        <div className="img_svgS">
          <img src={login} alt="Signup_image" />
        </div>
      </div>
      <div className="login-container col space-evenly">
        <div className="">
          <form
            onSubmit={handleSubmit(signupHandel)}
            className="space-evenly col f-center"
          >
            <img className="avater " alt="avater" src={profile} />
            <h1>Signup</h1>
            <small className="error-msg">{msg && msg}</small>

            <div className="i">
              <FaExclamationCircle size="2rem" className="icon" />
              <small className="warning-msg">{alertMessage}</small>
            </div>

            <div className=" input-div">
              <div className="i">
                <FaUser size="2rem" className="icon" />
              </div>
              <div>
                <input
                  className="input"
                  autoComplete="off"
                  type="text"
                  name="name"
                  ref={register({
                    required: "Name is empty",
                    pattern: {
                      value: /^[a-z A-Z]{3,20}$/,
                      message: "Name only contain alphabetes",
                    },
                  })}
                />
              </div>
            </div>
            {errors.name && (
              <small className="error-msg">{errors.name.message}</small>
            )}
            <div className=" input-div">
              <div className="i">
                <FaAt size="2rem" className="icon" />
              </div>
              <div>
                <input
                  className="input"
                  autoComplete="off"
                  type="email"
                  name="email"
                  ref={register({
                    required: " Email is empty",
                  })}
                />
              </div>
            </div>
            {errors.email && (
              <small className="error-msg"> {errors.email.message}</small>
            )}

            <div className=" input-div">
              <div className="i">
                <FaMobile size="2rem" className="icon" />
              </div>
              <div>
                <input
                  className="input"
                  autoComplete="off"
                  type="text"
                  name="phoneNo"
                  ref={register({
                    required: " Phone no is empty",
                    pattern: {
                      value: /^[0-9]{10,10}$/,
                      message: " Phone no should contain only 10 numbers",
                    },
                  })}
                />
              </div>
            </div>
            {errors.phoneNo && (
              <small className="error-msg"> {errors.phoneNo.message}</small>
            )}

            <div className=" input-div">
              <div className="i">
                <FaUserLock size="2rem" className="icon" />
              </div>
              <div>
                <input
                  className="input"
                  autoComplete="off"
                  type="text"
                  name="userName"
                  ref={register({
                    required: "The User Name is empty",
                    pattern: {
                      value: /(?!^[0-9]*$)(?!^[a-zA-Z]*$)^([a-zA-Z0-9]{6,16})$/,
                      message: "The username should be alphanumeric",
                    },
                  })}
                />
              </div>
            </div>
            {errors.userName && (
              <small className="error-msg">{errors.userName.message}</small>
            )}

            <div className=" input-div">
              <div className="i">
                <FaLock size="2rem" className="icon" />
              </div>
              <div>
                <input
                  className="input"
                  autoComplete="off"
                  type="password"
                  name="password"
                  ref={register({
                    required: "The Password is empty",
                    pattern: {
                      value: /(?!^[0-9]*$)(?!^[a-zA-Z]*$)^([a-zA-Z0-9]{6,16})$/,
                      message: "The Password should be alphanumeric",
                    },
                  })}
                  onChange={(e) => setConPass({ pass: e.target.value })}
                />
              </div>
            </div>
            {errors.password && (
              <small className="error-msg"> {errors.password.message}</small>
            )}

            <div className=" input-div">
              <div className="i">
                <FaCheckDouble size="1rem" className="icon" />
                <FaLock size="2rem" className="icon" />
              </div>
              <div>
                <input
                  className="input"
                  autoComplete="off"
                  type="password"
                  name="conpass"
                  ref={register({
                    required: "Conform Password is empty",
                    pattern: {
                      value: /(?!^[0-9]*$)(?!^[a-zA-Z]*$)^([a-zA-Z0-9]{6,16})$/,
                      message: "The Confomr Password should be alphanumeric",
                    },
                  })}
                  onBlur={(e) => handelConPass(e)}
                />
              </div>
            </div>
            {ConPass.msg && (
              <small className="error-msg">
                The Password and Conform Password Does not Matches
              </small>
            )}
            {errors.conpass && (
              <small className="error-msg">{errors.conpass.message}</small>
            )}

            <div>
              <span className="link" onClick={props.changePage}>
                Already have an account
                <b onClick={props.changePage}>Click here</b>
              </span>
            </div>
            <div>
              <button className="btn-success">Signup</button>
            </div>
            <small className="error-msg">{msg && msg}</small>
          </form>
        </div>
      </div>
    </div>
  );
};
let mapStateToProps = (state) => {
  return {
    addUsersState: state.AuthenticationReducers.message,
  };
};
let mapDispatchToProps = (dispatch) => {
  return {
    addUsersDispatch: (data) => dispatch(actions.AddHomeOwners(data)),
    addNewTendentDispatch: (data) => dispatch(actions.AddTendents(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
