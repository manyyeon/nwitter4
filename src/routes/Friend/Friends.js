import React, { useState } from "react";
import FriendsList from "./FriendsList";

const Friends = () => {
  const [modalIsOpened, setModalIsOpened] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  return (
    <>
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
      />
    </>
  );
};

export default Friends;
