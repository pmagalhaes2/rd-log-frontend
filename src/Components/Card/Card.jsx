import React from 'react';
import PropTypes from 'prop-types';
import styles from './Card.module.scss';

const Card = ({ category, total, onClick }) => {
  return (
    <div className={styles.card} onClick={onClick}>
      <h3>{category}</h3>
      <p>Total: {total}</p>
    </div>
  );
};

Card.propTypes = {
  category: PropTypes.string.isRequired,
  total: PropTypes.number.isRequired,
  onClick: PropTypes.func,
};

export default Card;
