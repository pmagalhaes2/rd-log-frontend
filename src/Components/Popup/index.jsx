import React from "react";

import styles from "./Popup.module.scss";
import { Icon } from "@iconify/react/dist/iconify";
import exitIcon from "@iconify-icons/mdi/close-thick";

export const Popup = ({ imageUrl, alt, message, onClick }) => {
  return (
    <div className={styles.container}>
      <div className={styles["popup-inner"]}>
        <img
          src={imageUrl}
          alt={alt}
          width={250}
        />
        <p>{message}</p>
        <button className={styles["close-btn"]} onClick={onClick}>
          <Icon icon={exitIcon} />
        </button>
      </div>
    </div>
  );
};
