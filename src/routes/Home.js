import { dblClick } from "@testing-library/user-event/dist/click";
import React, { useEffect, useState } from "react";

import { dbService } from "../fbase";
import { addDoc, collection } from "firebase/firestore";
import { MdPersonSearch } from "react-icons/md";
import BigCalendar from "./Calendar/BigCalendar";

const Home = ({ userObj }) => {
  const [following, setFollowing] = useState("");
  const [followingList, setFollowingList] = useState([]);
  const [userList, setUserList] = useState([]);
  const [followingBtnList, setFollowingBtnList] = useState([]);

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
        const followingBtnList = snapshot.docs.map((doc) => (
          <button
            id={doc.data().email}
            key={doc.id}
            onClick={(e) => {
              console.log(e.target.id);
            }}
          >
            사람
          </button>
        ));
        setFollowingBtnList(followingBtnList);
      });

    dbService.collection("users").onSnapshot((snapshot) => {
      const userList = snapshot.docs.map((doc) => ({
        ...doc.data(),
        email: doc.id,
      }));
      setUserList(userList);
    });
    console.log(userList);
  }, []);

  return (
    <>
      {followingBtnList}
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          await addDoc(
            collection(dbService, `users/${userObj.email}/following`),
            {
              name: "",
              email: following,
            }
          );
          setFollowing("");
        }}
      >
        <MdPersonSearch />
        <input
          type="email"
          placeholder="친구 검색"
          value={following}
          required
          onChange={(e) => setFollowing(e.target.value)}
        />
        <input type="submit" value="팔로잉하기" />
      </form>

      {followingList.map((followingObj) => (
        <BigCalendar key={followingObj.id} userObj={followingObj} />
      ))}
    </>
  );
};
export default Home;
