import React from "react";
import { Link } from "react-router-dom";
import { AiOutlineHome } from "react-icons/ai";
import { RiAccountCircleLine } from "react-icons/ri";
import styles from "../styles/Navigation.module.scss";
import { FiMenu } from "react-icons/fi";
import { IoLogOutOutline }from "react-icons/io5";

const Navigation = () => (
  <nav>
    <ul className={styles.icons}>
      <div className={styles.icon}>
        <Link to="/">
          <AiOutlineHome size="55" color="#1864ab" />
        </Link>
      </div>
      <div className={styles.icon}>
        <Link to="/profile">
          <RiAccountCircleLine size="55" color="#1864ab" />
        </Link>
      </div>
      <div className={styles.icon}>
        <FiMenu size="55" color="#1864ab" />
      </div>
      <div className={styles.icon}>
        <IoLogOutOutline size="55" color="1864ab"/>
      </div>
    </ul>
  </nav>
);

export default Navigation;
