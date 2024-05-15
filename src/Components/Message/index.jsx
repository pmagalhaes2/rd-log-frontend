import React from "react";

import styles from "./Message.module.scss";

export const Message = ({ message, isError = false }) => {
  return (
    <p
      className={`${styles.message} ${isError ? styles.error : styles.success}`}
    >
      {message}
    </p>
  );
};
