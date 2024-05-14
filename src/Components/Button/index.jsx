import React from "react";

import styles from "./Button.module.scss";

export const Button = ({
  disabled = false,
  onClick,
  title = "Button",
  type = "button",
  freeSize = false,
  variant = "primary",
}) => {
  return (
    <div
      className={`${styles.container} ${freeSize ? styles.freeSize : ""}`}
      freeSize={freeSize}
    >
      <button
        className={`${styles.button_container} ${
          variant === "primary"
            ? styles.primary
            : variant === "secondary"
            ? styles.secondary
            : styles.tertiary
        }`}
        disabled={disabled}
        onClick={onClick}
        type={type}
        variant={variant}
      >
        {title}
      </button>
    </div>
  );
};
