import React, { useEffect, useState } from "react";
import AppRouter from "./Router";
import { authService } from "../fbase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Modal from "react-modal";
import { dbService } from "../fbase";
import { addDoc, collection, setDoc } from "firebase/firestore";
import { useRouteMatch } from "react-router-dom/cjs/react-router-dom.min";

Modal.setAppElement("#root");
function App() {
  const auth = getAuth();
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userObj, setUserObj] = useState(null);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserObj(user);
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
      setInit(true);
    });
  }, []);
  return (
    <>
      {init ? (
        <AppRouter
          isLoggedIn={isLoggedIn}
          userObj={userObj}
          setInit={setInit}
        />
      ) : (
        "Initializing..."
      )}
      <footer>&copy; EveryDay {new Date().getFullYear()}</footer>
    </>
  );
}

export default App;
