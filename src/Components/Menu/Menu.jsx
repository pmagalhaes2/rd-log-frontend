import React, { useState } from 'react';
import styles from './Menu.module.scss'; 
import menuIcon from '../../assets/images/image 7.png';

function MenuComponent() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className={`${styles['menu-lateral']} ${menuOpen ? styles['menu-open'] : ''}`}>
      <div className={styles['menu-icon']} onClick={toggleMenu}>
        <img src={menuIcon} alt="Menu" />
      </div>
      <div className={styles['menu']}>
        <ul className={styles['menu-list']}> 
          <li className={styles['menu-item']}>Dashboard</li> 
          <li className={styles['menu-item']}>Entrega Fornecedor</li>
          <li className={styles['menu-item']}>Entrega Cliente</li>
          <li className={styles['menu-item']}>Pedidos Entregues</li>
          <li className={styles['menu-item']}>faQs</li>
        </ul>
      </div>
    </div>
  );
}

export default MenuComponent;
