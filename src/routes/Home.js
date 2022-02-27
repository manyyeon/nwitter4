import { click, dblClick } from "@testing-library/user-event/dist/click";
import React, { useEffect, useState, useRef } from "react";

import { dbService } from "../fbase";
import { addDoc, collection } from "firebase/firestore";
import { MdPersonSearch } from "react-icons/md";
import BigCalendar from "./Calendar/BigCalendar";
import SearchFriend from "./Friend/SearchFriend";
import RenderFollowings from "./Friend/RenderFollowings";

const Home = ({ userObj }) => {
  return <RenderFollowings userObj={userObj} />;
};
export default Home;
