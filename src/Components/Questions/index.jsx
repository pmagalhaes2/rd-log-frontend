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
      {questions.map((question, index) => (
        <div key={index} className={styles.question_container}>
          <div className={styles.question_heading}>
            <p>{question}</p>
            <Icon
              icon={openedId === index ? arrowUp : arrowDown}
              onClick={() => handleOpened(index)}
            />
          </div>
          {openedId === index && (
            <div className={styles.answer_container}>
              <p>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Minima
                repellendus quibusdam numquam animi modi officia nisi? Et, ab
                obcaecati totam suscipit consequatur, libero tenetur ratione
                adipisci, sit cumque autem recusandae?
              </p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
