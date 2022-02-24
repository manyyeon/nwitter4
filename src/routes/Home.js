import { click, dblClick } from "@testing-library/user-event/dist/click";
import React, { useEffect, useState } from "react";

import { dbService } from "../fbase";
import { addDoc, collection } from "firebase/firestore";
import { MdPersonSearch } from "react-icons/md";
import BigCalendar from "./Calendar/BigCalendar";

const Home = ({ userObj }) => {
  const [followingEmail, setFollowingEmail] = useState("");
  const [followingList, setFollowingList] = useState([]);
  const [userList, setUserList] = useState([]);
  const [followingBtnList, setFollowingBtnList] = useState([]);
  const [clickedPerson, setClickedPerson] = useState({
    id: "",
    name: "",
    email: "",
  });

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
        if (followingList.length !== 0) {
          setClickedPerson({
            ...clickedPerson,
            email: followingList[0].email,
          });
          const followingBtnList = snapshot.docs.map((doc) => (
            <button
              id={doc.data().email}
              key={doc.id}
              onClick={(e) => {
                setClickedPerson({
                  ...clickedPerson,
                  email: e.target.id,
                });
              }}
            >
              사람
            </button>
          ));
          setFollowingBtnList(followingBtnList);
        }
      });

    dbService.collection("users").onSnapshot((snapshot) => {
      const userList = snapshot.docs.map((doc) => ({
        ...doc.data(),
        email: doc.id,
      }));
      setUserList(userList);
    });
  }, []);

  return (
    <>
      <div>{clickedPerson.email}</div>
      {followingBtnList}
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          let isExistUser = false;
          for (let i = 0; i < userList.length; i++) {
            if (userList[i].email === followingEmail) {
              isExistUser = true;
              await addDoc(
                collection(dbService, `users/${userObj.email}/following`),
                {
                  name: "",
                  email: followingEmail,
                }
              );
              break;
            }
          }
          if (isExistUser === false) {
            alert("그런 사람 없음");
          }
          setFollowingEmail("");
        }}
      >
        <MdPersonSearch />
        <input
          type="email"
          placeholder="친구 검색"
          value={followingEmail}
          required
          onChange={(e) => setFollowingEmail(e.target.value)}
        />
        <input type="submit" value="팔로잉하기" />
      </form>
      {followingBtnList.length !== 0 ? (
        <BigCalendar key={clickedPerson.email} userObj={clickedPerson} />
      ) : (
        "팔로잉할 사람을 추가해보세요"
      )}
    </>
  );
};
export default Home;
