import React, { useEffect } from "react";
import { MdSettingsInputAntenna } from "react-icons/md";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { authService, dbService } from "../fbase";
import BigCalendar from "./Calendar/BigCalendar";
import Friends from "./Friend/Friends";
import { IoLogOutOutline }from "react-icons/io5";

const Profile = ({ userObj, setInit }) => {
  const history = useHistory();
  const onLogOutClick = () => {
    setInit(false);
    authService.signOut();
    history.push("/");
  };

  return (
    <>
      <IoLogOutOutline onClick={onLogOutClick} size="60" color="#1864ab" style={{display: "flex", justifyContent: "end"}}/>
      <Friends userObj={userObj} />
      <BigCalendar userObj={userObj} />
    </>
  );
};

export default Profile;
