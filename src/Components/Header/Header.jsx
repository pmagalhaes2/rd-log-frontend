import React, { useState } from "react";
import styles from "./Header.module.scss";
import rdlog from "../../assets/images/rdlog.png";
import userIcon from "../../assets/images/user-icon.svg";
import arrowUp from "@iconify-icons/mdi/keyboard-arrow-up";
import arrowDown from "@iconify-icons/mdi/keyboard-arrow-down";
import { Input } from "../Input";
import { useUser } from "../../context/UserContext";
import { Button } from "../Button";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react/dist/iconify.js";

export default function Header() {
  const { user, logout } = useUser();
  const isLoggedIn = user && user.role !== "";
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleMouseOver = () => {
    setIsMenuOpen(true);
  };

  const handleMouseOut = () => {
    setIsMenuOpen(false);
  };

  const handleLogout = () => {
    logout();
    setIsMenuOpen(false);
  };

  return (
    <header className={styles.headerContainer}>
      <img className={styles.logo} src={rdlog} alt="RDLog" />

      <div className={styles.searchContainer}>
        <Input
          placeholder={"O que você precisa?"}
          searchInput={true}
          freeSize={false}
        />
      </div>
      <div className={styles.separator}></div>

      {isLoggedIn ? (
        <div className={styles.userSection}>
          <img src={userIcon} alt="UserIcon" className={styles.userIcon} />
          <div className={styles.userText}>
            <span>Bem-vindo(a),</span>
            <span className={styles.personContainer} onClick={handleMenuToggle}>
              {user.username}!
            </span>
          </div>
          <div
            className={styles.iconContainer}
            onMouseOver={handleMouseOver}
            onMouseOut={handleMouseOut}
          >
            <Icon
              className={styles.expandIcon}
              icon={isMenuOpen ? arrowUp : arrowDown}
              onClick={handleMenuToggle}
            />

            {isMenuOpen && (
              <div className={`${styles.userMenu} ${styles.open}`}>
                <ul>
                  <li>
                    <Link to="/edit-profile" onClick={handleMenuToggle}>
                      Editar Perfil
                    </Link>
                  </li>
                </ul>
                <ul>
                  <li>
                    <Link to="/login" onClick={handleLogout}>
                      Sair
                    </Link>
                  </li>
                </ul>
              </div>
            )}
          </div>
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
