import React from "react";
import styles from "./Menu.module.scss";
import menuIcon from "../../assets/images/image 7.png";
import pack from "../../assets/images/Pack.png";
import dash from "../../assets/images/Dash.png";
import truck from "../../assets/images/Truck.png";
import maps from "../../assets/images/maps.png";
import faqs from "../../assets/images/FaQs.png";

function MenuComponent({ pageName }) {
  return (
    <div>
      <div className={styles["menu-icon"]}>
        <img src={menuIcon} alt="Menu" />
        <h3>{pageName}</h3>
      </div>
      <div>
        <ul>
          <li>
            <img src={dash} alt="Dashboard" />
            Dashboard
          </li>
          <li>
            <img src={truck} alt="Histórico" />
            Histórico
          </li>
          <li>
            <img src={pack} alt="Solicitações" />
            Solicitações
          </li>
          <li>
            <img src={maps} alt="Mapas" />
            Mapas
          </li>
          <li>
            <img src={faqs} alt="FAQs" />
            FAQs
          </li>
        </ul>
      </div>
    </div>
  );
}

export default MenuComponent;
