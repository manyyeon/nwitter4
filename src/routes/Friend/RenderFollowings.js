import { click, dblClick } from "@testing-library/user-event/dist/click";
import React, { useEffect, useState, useRef } from "react";

import { dbService } from "../../fbase";
import classNames from "classnames/bind";
import { addDoc, collection } from "firebase/firestore";
import { MdPersonSearch } from "react-icons/md";
import BigCalendar from "../Calendar/BigCalendar";
import SearchFriend from "./SearchFriend";
import IoPersonCircleOutline from "react-icons/io5";
import styles from "../../styles/RenderFollowings.module.scss";

const cx = classNames.bind(styles);

const RenderFollowings = ({ userObj }) => {
  const [followingList, setFollowingList] = useState([]);
  const [userList, setUserList] = useState([]);
  const [followingBtnList, setFollowingBtnList] = useState([]);
  const [clickedPerson, setClickedPerson] = useState({
    id: "",
    name: "",
    email: "",
  });
  const [modalIsOpened, setModalIsOpened] = useState(false);

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
            <button className={cx("Button")}
              id={doc.data().email}
              key={doc.id}
              onClick={(e) => {
                setClickedPerson({
                  ...clickedPerson,
                  email: e.target.id,
                });
              }}
            >사람</button>
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
      <div>
        <MdPersonSearch />
        <input
          placeholder="친구 검색"
          onClick={(e) => setModalIsOpened(true)}
        />
      </div>

      <SearchFriend
        userObj={userObj}
        modalIsOpened={modalIsOpened}
        setModalIsOpened={setModalIsOpened}
        userList={userList}
        followingList={followingList}
        setFollowingList={setFollowingList}
      />
      {followingBtnList.length !== 0 ? (
        <BigCalendar key={clickedPerson.email} userObj={clickedPerson} />
      ) : (
        "팔로잉할 사람을 추가해보세요"
      )}
    </>
  );
};
export default RenderFollowings;
