import React, { useEffect } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { authService, dbService } from "../fbase";
import BigCalendar from "./Calendar/BigCalendar";
import Friends from "./Friend/Friends";

const Profile = ({ userObj }) => {
  const history = useHistory();
  const onLogOutClick = () => {
    authService.signOut();
    history.push("/");
  };

  return (
    <>
      <Friends />
      <button onClick={onLogOutClick}>Log Out</button>
      <BigCalendar userObj={userObj} />
    </>
  );
};

export default Profile;
