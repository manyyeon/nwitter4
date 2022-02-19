import { dblClick } from "@testing-library/user-event/dist/click";
import React, { useEffect, useState } from "react";

import { dbService } from "../fbase";
import { addDoc, collection } from "firebase/firestore";
import { MdPersonSearch } from "react-icons/md";
import BigCalendar from "./Calendar/BigCalendar";

const Home = ({ userObj }) => {
  const [followingList, setFollowingList] = useState([]);

  useEffect(() => {
    dbService
      .collection("users")
      .doc(`${userObj.email}`)
      .collection("following")
      .onSnapshot((snapshot) => {
        const followingList = snapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
          name: "",
          email: doc.data().email,
        }));
        setFollowingList(followingList);
      });
  }, []);

  return (
    <>
      <form>
        <MdPersonSearch />
        <input type="text" placeholder="친구 검색" />
      </form>

      {followingList.map((following) => (
        <BigCalendar key={following.id} userObj={following} />
      ))}
    </>
  );
};
export default Home;
