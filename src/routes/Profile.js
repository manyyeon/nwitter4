import React from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { authService } from "../fbase";
import BigCalendar from "./Calendar/BigCalendar";

export default () => {
  const history = useHistory();
  const onLogOutClick = () => {
    authService.signOut();
    history.push("/");
  };
  return (
    <>
      <button onClick={onLogOutClick}>Log Out</button>
      <BigCalendar />
    </>
  );
};
