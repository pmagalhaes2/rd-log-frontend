import React from "react";
import styles from "./Menu.module.scss";
import menuIcon from "../../assets/images/image 7.png";
import pack from "../../assets/images/Pack.png";
import dash from "../../assets/images/Dash.png";
import truck from "../../assets/images/Truck.png";
import faqs from "../../assets/images/FaQs.png";
import { NavLink } from "react-router-dom";

function MenuComponent({ pageName }) {
  return (
    <div>
      <div className={styles["menu-icon"]}>
        <img src={menuIcon} alt="Menu" />
        <h3>{pageName}</h3>
      </div>
      <div>
        <ul>
          <NavLink
            to="/dashboard"
            className={({ isActive }) => (isActive ? styles.active : "")}
          >
            <img src={dash} alt="Dashboard" />
            Dashboard
          </NavLink>
          <NavLink
            to="/history"
            className={({ isActive }) => (isActive ? styles.active : "")}
          >
            <img src={truck} alt="Histórico" />
            Histórico
          </NavLink>
          <NavLink
            to="/requests"
            className={({ isActive }) => (isActive ? styles.active : "")}
          >
            <img src={pack} alt="Solicitações" />
            Solicitações
          </NavLink>
          <NavLink
            to="/support"
            className={({ isActive }) => (isActive ? styles.active : "")}
          >
            <img src={faqs} alt="FAQs" />
            FAQs
          </NavLink>
        </ul>
      </div>
    </div>
  );
}

export default MenuComponent;
