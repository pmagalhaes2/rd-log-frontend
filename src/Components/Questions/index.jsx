import React from "react";
import expandArrowIcon from "../../assets/images/expand-arrow-icon.svg";

import styles from './Questions.module.scss'

export const Questions = ({ questions }) => {
  return (
    <div className={styles.container}>
      {questions.map((question, index) => (
        <div key={index}>
            <p>{question}</p>
            <img src={expandArrowIcon} alt="Ícone de seta de expansão" />
        </div>
      ))}
    </div>
  );
};
