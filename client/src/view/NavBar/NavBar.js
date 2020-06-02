import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import {
  FaIgloo,
  FaAngleDoubleRight,
  FaSignInAlt,
  FaUsers,
  FaCommentAlt,
  FaUser,
  FaSignOutAlt,
} from "react-icons/fa";
import logo from "../../Assets/Images/undraw_coming_home_52ir.svg";

import { Link, useHistory } from "react-router-dom";
let NavBar = (props) => {
  const history = useHistory();
  const [links, setLinks] = useState([]);
  useEffect(() => {
    !props.checkvalid && setLinks(Unvalid_users);
    props.checkvalid && localStorage.getItem("username")
      ? setLinks(Valid_users)
      : setLinks(Unvalid_users);
  }, [props.checkvalid]);
  // useEffect(() => {
  //   setLinks(Valid_users);
  // }, []);

  let Unvalid_users = [
    {
      to: "/",
      link: "Home",
      icon: <FaIgloo className="fa-primary" size="2rem" />,
    },
    {
      to: "/register",
      link: "Register",
      icon: <FaSignInAlt className="fa-primary" size="2rem" />,
    },
    // {
    //   to: "/about",
    //   link: "About",
    //   icon: <FaUsers size="2rem" className="fa-primary" />,
    // },
    {
      to: "/contact",
      link: "Contact",
      icon: <FaCommentAlt size="2rem" className="fa-primary" />,
    },
  ];
  let Valid_users = [
    {
      to: "/",
      link: "Home",
      icon: <FaIgloo className="fa-primary" size="2rem" />,
    },
    {
      to: "/profile",
      link: localStorage.getItem("username"),
      icon: <FaUser className="fa-primary" size="2rem" />,
    },

    // {
    //   to: "/about",
    //   link: "About",
    //   icon: <FaUsers size="2rem" className="fa-primary" />,
    // },
    {
      to: "/contact",
      link: "Contact",
      icon: <FaCommentAlt size="2rem" className="fa-primary" />,
    },
    {
      to: "/logout",
      link: "Logout",
      clicked: history.push("/register"),
      icon: <FaSignOutAlt className="fa-primary" size="2rem" />,
    },
  ];
  return (
    <nav className="navbar">
      <ul className="navbar-nav">
        <li className="logo">
          <Link to="/" className="nav-link">
            {/* <span className="link-text"> Rental System</span> */}
            <img src={logo} alt="logo" className="link-text" width="130px" />
            <div>
              <FaAngleDoubleRight size="2rem" className="fa-primary" />
            </div>
          </Link>
        </li>
        {links.map((link, key) => (
          <li className="nav-item" key={key}>
            <Link
              className="nav-link"
              onClick={link.clicked && link.clicked}
              to={link.to}
            >
              <div>{link.icon}</div>
              <span className="link-text">{link.link}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};
let mapStatetoProps = (state) => {
  return {
    checkvalid: state.AuthenticationReducers.usresInfo,
  };
};
let mapDispatchToProps = (dispatch) => {
  return {};
};
export default connect(mapStatetoProps, mapDispatchToProps)(NavBar);
