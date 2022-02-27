import React, { useEffect } from "react";
import { MdSettingsInputAntenna } from "react-icons/md";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { authService, dbService } from "../fbase";
import BigCalendar from "./Calendar/BigCalendar";
import Friends from "./Friend/Friends";

const Profile = ({ userObj, setInit }) => {
  const history = useHistory();
  const onLogOutClick = () => {
    setInit(false);
    authService.signOut();
    history.push("/");
  };

  return (
    <>
      <Friends userObj={userObj} />
      <button onClick={onLogOutClick}>Log Out</button>
      <BigCalendar userObj={userObj} />
    </>
  );
};

export default Profile;
