import React, { useState } from "react";
import { Icon } from "@iconify/react/dist/iconify";

import arrowUp from "@iconify-icons/mdi/keyboard-arrow-up";
import arrowDown from "@iconify-icons/mdi/keyboard-arrow-down";

import styles from "./Questions.module.scss";

export const Questions = ({ questions }) => {
  const [openedId, setOpenedId] = useState(null);

  const handleOpened = (index) => {
    setOpenedId(openedId === index ? null : index);
  };

  return (
    <div className={styles.container}>
      {questions.map((item, index) => (
        <div key={index} className={styles.question_container}>
          <div className={styles.question_heading}>
            <p>{item.question}</p>
            <Icon
              icon={openedId === index ? arrowUp : arrowDown}
              onClick={() => handleOpened(index)}
            />
          </div>
          {openedId === index && (
            <div className={styles.answer_container}>
              <p>{item.answer}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
