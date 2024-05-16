import React, { useState } from "react";

import questionIcon from "../../assets/images/question-icon.svg";

import styles from "./Support.module.scss";
import { Questions } from "../../Components/Questions";
import { Input } from "../../Components/Input";
import MenuComponent from "../../Components/Menu/Menu";

import questions from "../../Components/Questions/questions";

export const Support = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredQuestions =
    searchTerm.length > 3
      ? questions.filter(
          (item) =>
            item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.answer.toLowerCase().includes(searchTerm.toLowerCase())
        )
      : questions;

  return (
    <div className={styles.container}>
      <MenuComponent pageName={"FAQs"} />
      <div className={styles.questions_container}>
        <div className={styles.questions_heading}>
          <span>
            <img src={questionIcon} alt="Ícone de pergunta" />
            <h3>Perguntas Frequentes</h3>
          </span>
          <div>
            <Input
              searchInput={true}
              placeholder={"Digite um campo para buscar"}
              onChange={handleSearch}
              freeSize={false}
            />
          </div>
        </div>
        <Questions questions={filteredQuestions} />
      </div>
    </div>
  );
};
