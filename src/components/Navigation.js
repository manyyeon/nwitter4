import React from "react";
import { Link } from "react-router-dom";
import { AiOutlineHome } from "react-icons/ai";
import { RiAccountCircleLine } from "react-icons/ri";
import styles from "../styles/Navigation.module.scss";

const Navigation = () => (
  <nav>
    <ul className={styles.icons}>
      <div className={styles.icon}>
        <Link to="/">
          <AiOutlineHome size="60" color="#1864ab" />
        </Link>
      </div>
      <div className={styles.icon}>
        <Link to="/profile">
          <RiAccountCircleLine size="60" color="#1864ab" />
        </Link>
      </div>
    </ul>
  </nav>
);

export default Navigation;
