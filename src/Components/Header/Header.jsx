import React from "react";
import styles from "./styles.module.scss";
import rdlog from "../../assets/images/rdlog.png";
import userIcon from "../../assets/images/user-icon.svg";
import expandArrowIcon from "../../assets/images/expand-header-icon.svg";
import { Input } from "../Input";

export default function Header() {
  return (
    <header className={styles.headerContainer}>
      <img className={styles.logo} src={rdlog} alt="RDLog" />

      <div className={styles.searchContainer}>
        <Input placeholder={"O que você precisa?"} searchInput={true} />
      </div>
      <div className={styles.separator}></div>

      <div className={styles.userSection}>
        <img src={userIcon} alt="UserIcon" className={styles.userIcon} />

        <div className={styles.userText}>
          <span>Bem-vindo(a),</span>
          <span className={styles.personContainer}>Cristina!</span>
        </div>
        <img
          className={styles.expandIcon}
          src={expandArrowIcon}
          alt="ExpandIcon"
        />
      </div>
    </header>
  );
}
