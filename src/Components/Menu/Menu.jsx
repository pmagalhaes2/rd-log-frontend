import React from "react";
import styles from "./Menu.module.scss";
import menuIcon from "../../assets/images/image 7.png";
import dash from "../../assets/images/Dash.png";
import truckImg from "../../assets/images/truckImg.png";
import truck from "../../assets/images/Truck.png";
import faqs from "../../assets/images/FaQs.png";
import { NavLink } from "react-router-dom";
import { useUser } from "../../context/UserContext";

function MenuComponent({ pageName }) {
  const { user } = useUser();
  const { role } = user;

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
          {role === "admin" && (
            <NavLink
              to="/requests"
              className={({ isActive }) => (isActive ? styles.active : "")}
            >
              <img src={truckImg} alt="Solicitações" />
              Solicitações
            </NavLink>
          )}
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
