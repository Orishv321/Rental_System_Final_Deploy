import React, { useState, useEffect } from "react";
import login from "../../../Assets/Images/undraw_Login_v483.svg";
import profile from "../../../Assets/Images/undraw_profile_pic_ic5t.svg";
import { FaLock, FaUserLock } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import * as actions from "../../../Store/Actions";
let Login = (props) => {
  const history = useHistory();
  const { register, errors, handleSubmit } = useForm();
  const [msg, setMsg] = useState();
  useEffect(() => {
    props.checkValid === "ValidUsers"
      ? history.push("/profile")
      : setMsg(props.checkValid);
  }, [props.checkValid]);
  let loginHandel = (data) => {
    props.useAuthentication(data);
  };
  return (
    <div className=" g-row">
      <div className=" rightimg space-evenly">
        <div className="img_svg">
          <img src={login} alt="login_image" />
        </div>
      </div>
      <div className="login-container col space-evenly">
        <div>
          <form
            onSubmit={handleSubmit(loginHandel)}
            className="space-evenly col f-center"
          >
            <img className="avater" alt="avater" src={profile} />
            <h1>Login</h1>
            <small className="error-msg">{msg && msg}</small>
            <div className=" input-div">
              <div className="i">
                <FaUserLock className="icon" size="2rem" />
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
                <FaLock className="icon" size="2rem" />
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
                />
              </div>
            </div>
            {errors.password && (
              <small className="error-msg">{errors.password.message}</small>
            )}
            <div>
              <span className="link" onClick={props.changePage}>
                Dont have an account{" "}
                <b onClick={props.changePage}>Click here</b>
              </span>
            </div>
            <div>
              <button className="btn-success">Login</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
let mapStateToProps = (state) => {
  return {
    checkValid: state.AuthenticationReducers.message,
  };
};
let mapDispatchToProps = (dispatch) => {
  return {
    useAuthentication: (data) => dispatch(actions.LoginUsers(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
