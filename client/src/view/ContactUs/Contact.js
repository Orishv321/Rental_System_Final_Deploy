import React, { useEffect, useState } from "react";
import login from "../../Assets/Images/undraw_delivery_address_03n0.svg";
import {
  FaCommentAlt,
  FaAt,
  FaPhone,
  FaAddressCard,
  FaFacebook,
} from "react-icons/fa";
import { useForm } from "react-hook-form";
import { connect } from "react-redux";
import * as actions from "../../Store/Actions";
let Contact = (props) => {
  const { register, errors, handleSubmit } = useForm();
  const [contacts, setContacts] = useState([]);
  useEffect(() => {
    props.getAllContatct();
  }, []);
  useEffect(() => {
    props.allContact && setContacts(props.allContact);
  }, [props.allContact]);
  let contactHandel = (data) => {
    props.addContact(data);
  };
  return (
    <div className="col">
      <div className="g-row">
        <div className=" rightimg space-evenly">
          <div className="img_svg">
            <img src={login} />
          </div>
        </div>
        <div className="login-container col space-evenly">
          <div className="">
            <form
              className="space-evenly col f-center"
              onSubmit={handleSubmit(contactHandel)}
            >
              <h1>Contact Us</h1>
              <div className=" input-div">
                <div className="i">
                  <FaAt className="icon" size="2rem" />
                </div>
                <div>
                  <input
                    className="input"
                    autoComplete="off"
                    type="email"
                    name="email"
                    ref={register({
                      required: "The Email is  empty",
                    })}
                  />
                </div>
              </div>
              {errors.email && (
                <small className="error-msg">{errors.email.message}</small>
              )}

              <div className=" input-div">
                <div className="i">
                  <FaCommentAlt className="icon" size="2rem" />
                </div>
                <div>
                  <textarea
                    className="input"
                    name="message"
                    cols="24"
                    ref={register({
                      required: "Message is required",
                      pattern: {
                        value: /^[a-z A-Z]{10,150}$/,
                        message: "Message should contain only alphabets",
                      },
                    })}
                  ></textarea>
                </div>
              </div>
              {errors.message && (
                <small className="error-msg">{errors.message.message}</small>
              )}

              <div>
                <button className="btn-success">Submit</button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div className="g-row">
        <div className="space-evenly">
          <div className="card">
            <div className="card-title">You Can Also Contact Us By</div>
            <div className="card-body">
              <div>
                <div className="row">
                  <FaAt className="contact-icon" size="1.3rem" />
                  <label>Email : </label>hsirov321@gmail.com
                </div>

                <div className="row">
                  <FaPhone className="contact-icon" size="1.3rem" />
                  <label>Phone no. : </label>+977-9876547894, 01-4278956
                </div>

                <div className="row">
                  <FaAddressCard className="contact-icon" size="1.3rem" />
                  <label>Address : </label>Nepal Kathmandu Tokha
                </div>

                <div className="row">
                  <FaFacebook className="contact-icon" size="1.3rem" />
                  <label>Facebook : </label>hsirospage.com
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="space-evenly">
          <div className="card">
            <div className="card-title">Messages We Recieve</div>
            <div className="card-body">
              <div className="msg-controller">
                {contacts &&
                  contacts
                    .slice(-10)
                    .reverse()
                    .map((con, key) => <div key={key}>{con.message}</div>)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

let mapStateToProps = (state) => {
  return {
    allContact: state.ContactReducer.allContacts,
  };
};
let mapDispatchToProps = (dispatch) => {
  return {
    addContact: (data) => dispatch(actions.AddContact(data)),
    getAllContatct: () => dispatch(actions.GetAllContact()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Contact);
