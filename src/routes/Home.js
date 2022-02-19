import { dblClick } from "@testing-library/user-event/dist/click";
import React, { useEffect, useState } from "react";

import { dbService } from "../fbase";
import { addDoc, collection } from "firebase/firestore";
import { MdPersonSearch } from "react-icons/md";

const Home = () => {
  useEffect(() => {
    dbService.collection("users").onSnapshot((snapshot) => {
      snapshot.docs.map((doc) => {
        console.log(doc.id);
      });
    });
  }, []);
  return (
    <div>
      <form>
        <MdPersonSearch />
        <input type="text" placeholder="친구 검색" />
      </form>
    </div>
  );
};
export default Home;
