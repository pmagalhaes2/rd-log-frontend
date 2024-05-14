import React from "react";

import styles from "./Error.module.scss";

export const Error = ({ message }) => {
  return <p className={styles.error_message}>{message}</p>;
};
