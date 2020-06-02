import React from "react";
import HomeOwnersProfile from "./HomeOwners/HomeOwnersProfile";
import TendentsProfile from "./Tendents_users/TendentsProfile";
import AdminProfile from "./Admin/AdminProfile";

let Profile = (props) => {
  return (
    <>
      {localStorage.getItem("type") === "1" && <AdminProfile />}
      {localStorage.getItem("type") === "2" && <HomeOwnersProfile />}
      {localStorage.getItem("type") === "3" && <TendentsProfile />}
    </>
  );
};
// switch(props.userType): case 1: reutnr
export default Profile;
