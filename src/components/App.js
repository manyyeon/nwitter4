import React, { useEffect, useState } from "react";
import AppRouter from "./Router";
import { authService } from "../fbase";
import Modal from "react-modal";
import { dbService } from "../fbase";
import { addDoc, collection, setDoc } from "firebase/firestore";
import { useRouteMatch } from "react-router-dom/cjs/react-router-dom.min";

Modal.setAppElement("#root");
function App() {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userObj, setUserObj] = useState(null);
  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      console.log("user");
      console.log(user);
      if (user) {
        setIsLoggedIn(true);
        setUserObj(user);
      } else {
        setIsLoggedIn(false);
      }
      setInit(true);
    });
  }, []);
  return (
    <>
      {init ? (
        <AppRouter isLoggedIn={isLoggedIn} userObj={userObj} />
      ) : (
        "Initializing..."
      )}
      <footer>&copy; EveryDay {new Date().getFullYear()}</footer>
    </>
  );
}

export default App;
