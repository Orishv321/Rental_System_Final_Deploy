import React, { useState } from "react";
import Login from "./Login/Login";
import Signup from "./Signup/Signup";
let Registration = () => {
  const [Toggle, setToggle] = useState({ pageinfo: true });
  let handelNewUsers = () => setToggle({ pageinfo: !Toggle.pageinfo });
  return (
    <div>
      {Toggle.pageinfo ? (
        <Login changePage={handelNewUsers} />
      ) : (
        <Signup changePage={handelNewUsers} />
      )}
    </div>
  );
};

export default Registration;
