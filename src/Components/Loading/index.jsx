import React from "react";
import { RotatingLines } from "react-loader-spinner";

import styles from "./Loading.module.scss";

export const Loading = () => {
  return (
    <div className={styles.container}>
      <RotatingLines
        visible={true}
        height="96"
        width="96"
        color="#4CA15D"
        strokeWidth="5"
        animationDuration="0.75"
        ariaLabel="rotating-lines-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
    </div>
  );
};
