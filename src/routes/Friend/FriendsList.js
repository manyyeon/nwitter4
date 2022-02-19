import React, { useState } from "react";
import Modal from "react-modal";
import classNames from "classnames/bind";
import styles from "../../styles/BigCalendar.module.scss";
import { BsX } from "react-icons/bs";

const cx = classNames.bind(styles);

const FriendsList = ({ modalIsOpened, setModalIsOpened, isFollowing }) => {
  return (
    <Modal
      isOpen={modalIsOpened}
      onRequestClose={() => setModalIsOpened(true)}
      style={{
        overlay: {
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(255, 255, 255, 0.75)",
          zIndex: 1050,
        },
        content: {
          position: "absolute",
          top: "250px",
          left: "200px",
          right: "200px",
          bottom: "100px",
          border: "10px solid #ccc",
          background: "#fff",
          overflow: "auto",
          WebkitOverflowScrolling: "touch",
          borderRadius: "4px",
          outline: "none",
          padding: "20px",
          fontSize: "80px",
        },
      }}
    >
      {isFollowing ? "팔로잉" : "팔로워"}
      <BsX
        onClick={() => {
          setModalIsOpened(false);
        }}
      />
    </Modal>
  );
};

export default FriendsList;
