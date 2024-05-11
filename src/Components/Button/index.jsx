import React from "react";

import styles from "./Button.module.scss";

export const Button = ({
  disabled = false,
  onClick,
  title = "Button",
  type = "button",
  freeSize = false,
}) => {
  return (
    <div
      className={`${styles.container} ${freeSize ? styles.freeSize : ""}`}
      freeSize={freeSize}
    >
      <button
        className={styles.button_container}
        disabled={disabled}
        onClick={onClick}
        type={type}
      >
        {title}
      </button>
    </div>
  );
};
