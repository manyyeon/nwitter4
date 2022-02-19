import React, { useState } from "react";
import { authService, dbService, firebaseInstance } from "../fbase";
import {
  getAuth,
  createUserWithEmailAndPassword,
  GithubAuthProvider,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "@firebase/auth";
import styles from "../styles/Auth.module.scss";
import classNames from "classnames/bind";
import { BsGithub, BsGoogle } from "react-icons/bs";
import { doc, setDoc } from "firebase/firestore";

const cx = classNames.bind(styles);

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newAccount, setNewAccount] = useState(true);
  const [error, setError] = useState("");
  const onChange = (event) => {
    const {
      target: { name, value },
    } = event;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };
  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      let data;
      const auth = getAuth();
      if (newAccount) {
        // create account
        data = await createUserWithEmailAndPassword(auth, email, password);
        setDoc(doc(dbService, "users", `${email}`), {});
      } else {
        // log in
        data = await signInWithEmailAndPassword(auth, email, password);
      }
    } catch (error) {
      setError(error.message);
    }
  };
  const toggleAccount = () => setNewAccount((prev) => !prev);
  const onSocialClick = async (event) => {
    const {
      target: { name },
    } = event;
    let provider;
    if (name === "google") {
      provider = new GoogleAuthProvider();
    } else if (name === "github") {
      provider = new GithubAuthProvider();
    }

    await signInWithPopup(authService, provider).then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      // user email 문서 만들기
      setDoc(doc(dbService, "users", `${user.email}`), {});
    });
  };
  return (
    <div className={cx("Auth")}>
      <div className={cx("Title")}>Every Day</div>
      <form onSubmit={onSubmit}>
        <input
          className={cx("Input")}
          name="email"
          type="email"
          placeholder="Email"
          required
          value={email}
          onChange={onChange}
        />
        <input
          className={cx("Input")}
          name="password"
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={onChange}
        />
        <input
          className={cx("Submit")}
          type="submit"
          value={newAccount ? "Create Account" : "Log In"}
        />
        <div>{error}</div>
      </form>
      <span className={cx("Text")}>
        {newAccount ? (
          <>
            <span>Already have an account?</span>
            <span className={cx("Toggle")} onClick={toggleAccount}>
              Sign in
            </span>
          </>
        ) : (
          <span className={cx("Toggle")} onClick={toggleAccount}>
            Create Account
          </span>
        )}
      </span>
      <div>
        <button className={cx("Submit")} onClick={onSocialClick} name="google">
          Continue with Google <BsGoogle />
        </button>
        <button className={cx("Submit")} onClick={onSocialClick} name="github">
          Continue with Github <BsGithub />
        </button>
      </div>
    </div>
  );
};
export default Auth;
