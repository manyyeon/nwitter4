import React, { useState, useEffect } from "react";
import FriendsList from "./FriendsList";
import { dbService } from "../../fbase";
import { onSnapshot } from "firebase/firestore";
import { BsPersonCircle } from "react-icons/bs";

const Friends = ({ userObj }) => {
  // 변수들 //
  const [modalIsOpened, setModalIsOpened] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const [followerList, setFollowerList] = useState([]);
  const [followingList, setFollowingList] = useState([]);

  useEffect(() => {
    dbService
      .collection("users")
      .doc(`${userObj.email}`)
      .collection("follower")
      .onSnapshot((snapshot) => {
        const followerList = snapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
          name: "",
          email: doc.data().email,
        }));
        setFollowerList(followerList);
      });
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
      <BsPersonCircle />
      <div></div>
      <button
        onClick={() => {
          setModalIsOpened(true);
          setIsFollowing(false);
        }}
      >
        팔로워
      </button>
      <button
        onClick={() => {
          setModalIsOpened(true);
          setIsFollowing(true);
        }}
      >
        팔로잉
      </button>
      <FriendsList
        modalIsOpened={modalIsOpened}
        setModalIsOpened={setModalIsOpened}
        isFollowing={isFollowing}
        followerList={followerList}
        followingList={followingList}
      />
    </>
  );
};

export default Friends;
