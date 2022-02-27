import React, { useState, useRef, useEffect } from "react";
import { dbService } from "../../fbase";
import { addDoc, collection } from "firebase/firestore";
import Modal from "react-modal";
import classNames from "classnames/bind";
import styles from "../../styles/BigCalendar.module.scss";
import { MdPersonSearch } from "react-icons/md";

const cx = classNames.bind(styles);

const SearchFriend = ({
  userObj,
  userList,
  modalIsOpened,
  setModalIsOpened,
}) => {
  const [searchFollowingList, setSearchFollowingList] = useState([]);
  const [followingEmail, setFollowingEmail] = useState("");

  const inputRef = useRef();

  useEffect(() => {
    if (followingEmail === "") {
      setSearchFollowingList([]);
    } else {
      setSearchFollowingList(
        userList.filter((user) => user.email.includes(followingEmail))
      );
    }
  }, [followingEmail]);

  return (
    <>
      <Modal
        isOpen={modalIsOpened}
        onRequestClose={() => setModalIsOpened(false)}
        style={{
          overlay: {
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(255, 255, 255, 0)",
            zIndex: 1050,
          },
          content: {
            position: "absolute",
            top: "200px",
            left: "50px",
            right: "50px",
            bottom: "50px",
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
            ref={inputRef}
            onChange={(e) => {
              setFollowingEmail(e.target.value);
            }}
          />
          <input type="submit" value="팔로잉하기" />
        </form>
        <div>{followingEmail}</div>
        {searchFollowingList.map((searchFollowing) => (
          <div key={searchFollowing.email}>{searchFollowing.email}</div>
        ))}
      </Modal>
    </>
  );
};

export default SearchFriend;
