import React from "react";
import questionIcon from "../../assets/images/question-icon.svg";

import styles from "./Support.module.scss";
import { Questions } from "../../Components/Questions";
import { Input } from "../../Components/Input";
import Footer from "../../Components/Footer/Footer";
import Header from "../../Components/Header/Header";
import MenuComponent from '../../Components/Menu/Menu';

export const Support = () => {
  return (
    <>
      <Header />
      <div className={styles.container}>
        <MenuComponent /> 
        <div className={styles.questions_container}>
          <div className={styles.questions_heading}>
            <span>
              <img src={questionIcon} alt="" />
              <h3>Perguntas Frequentes</h3>
            </span>
            <div>
              <Input
                placeholder={"Digite um campo para buscar"}
              />
            </div>
          </div>
          <Questions
            questions={[
              "Quais são os horários de funcionamento da nossa empresa de logística?",
              "Como faço para rastrear minha entrega?",
              "Quais são as opções de pagamento disponíveis para os serviços de entrega?",
              "Qual é a distância máxima para as entregas ao cliente final?",
              "Como posso solicitar um transporte para minha empresa?",
              "Posso agendar uma coleta de produtos em minha empresa?",
              "Quais documentos são necessários para contratar os serviços de transporte?",
            ]}
          />
        </div>
      </div>
      <Footer />
    </>
  );
};
