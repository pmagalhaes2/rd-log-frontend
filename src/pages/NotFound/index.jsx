import React from "react";
import notFoundImage from "../../assets/images/not-found.svg";
import { Button } from "../../Components/Button";
import { Link } from "react-router-dom";

import styles from "./NotFound.module.scss";

export const NotFound = () => {
  return (
    <div className={styles.container}>
      <div className={styles.not_found_container}>
        <img src={notFoundImage} alt="Imagem de página não encontrada" />
        <div className={styles.text_container}>
        <h1>Ops! Parece que você se perdeu...</h1>
        <p>
          A página que você está procurando não existe ou foi removida. Mas não
          se preocupe, vamos ajudá-lo a voltar ao caminho certo!
        </p>
        </div>
        <Link to="/login">
          <Button title="Voltar para a página principal" variant="tertiary" />
        </Link>
      </div>
    </div>
  );
};
