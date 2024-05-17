import React, { useState } from "react";
import styles from "./Header.module.scss";
import rdlog from "../../assets/images/rdlog.png";
import userIcon from "../../assets/images/user-icon.svg";
import expandArrowIcon from "../../assets/images/expand-header-icon.svg";
import { Input } from "../Input";
import { useUser } from "../../context/UserContext";
import { Button } from "../Button";
import { Link } from "react-router-dom";

export default function Header() {
  const { user } = useUser();
  const isLoggedIn = user && user.role !== "";
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className={styles.headerContainer}>
      <img className={styles.logo} src={rdlog} alt="RDLog" />

      <div className={styles.searchContainer}>
        <Input placeholder={"O que você precisa?"} searchInput={true} freeSize={false} />
      </div>
      <div className={styles.separator}></div>

      {isLoggedIn ? (
        <div className={styles.userSection}>
          <img src={userIcon} alt="UserIcon" className={styles.userIcon} />
          <div className={styles.userText}>
            <span>Bem-vindo(a),</span>
            <span className={styles.personContainer} onClick={handleMenuToggle}>{user.username}!</span>
          </div>
          <img
            className={styles.expandIcon}
            src={expandArrowIcon}
            alt="ExpandIcon"
            onClick={handleMenuToggle}
          />
          {isMenuOpen && (
            <div className={styles.userMenu}>
              <ul>
                <li>
                  <Link to="/edit-profile">Editar Perfil</Link>
                </li>
              </ul>
            </div>
          )}
        </div>
      ) : (
        <div className={styles.loginSection}>
          <Link to="/login">
            <Button title="Login" variant={"tertiary"} />
          </Link>
          <Link to="/register">
            <Button title="Registre-se" variant={"secondary"} />
          </Link>
        </div>
      )}
    </header>
  );
}
