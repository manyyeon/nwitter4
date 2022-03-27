import { click, dblClick } from "@testing-library/user-event/dist/click";
import React, { useEffect, useState, useRef } from "react";

import { dbService } from "../../fbase";
import classNames from "classnames/bind";
import { addDoc, collection } from "firebase/firestore";
import { MdPersonSearch } from "react-icons/md";
import BigCalendar from "../Calendar/BigCalendar";
import SearchFriend from "./SearchFriend";
import { BiSearch } from "react-icons/bi";
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
            <button className={cx("Following")}
              id={doc.data().email}
              key={doc.id}
              onClick={(e) => {
                setClickedPerson({
                  ...clickedPerson,
                  email: e.target.id,
                });
              }}
            ></button>
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
    <div className={cx("RenderFollowings")}>
      <div>{clickedPerson.email}</div>
      <div className={cx("PersonSearch")}>
        <BiSearch 
        size="24" color="#8E8E8E" style={{display: "flex", justifyContent: "end"}}
        />
        <input
          className={cx("SearchBox")}
          placeholder="친구 검색"
          onClick={(e) => setModalIsOpened(true)}
        />
      </div>
      <div className={cx("FollowingBtnList")}>{followingBtnList}</div>
      

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
    </div>
  );
};
export default RenderFollowings;
