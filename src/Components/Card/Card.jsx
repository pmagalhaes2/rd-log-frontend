import React from 'react';
import PropTypes from 'prop-types';
import styles from './Card.module.scss'; // Importe os estilos do arquivo SCSS correspondente

const Card = ({ category, total, onClick }) => {
  return (
    <div className={styles.card} onClick={onClick}>
      <h3>{category}</h3>
      <p>Total: {total}</p>
    </div>
  );
};

Card.propTypes = {
  category: PropTypes.string.isRequired, // Certifique-se de passar uma categoria de string para o componente
  total: PropTypes.number.isRequired, // Certifique-se de passar um total numérico para o componente
  onClick: PropTypes.func, // Função de clique opcional
};

export default Card;
