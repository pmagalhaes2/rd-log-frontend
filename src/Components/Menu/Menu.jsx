import React, { useState } from 'react';
import styles from './Menu.module.scss'; 
import menuIcon from '../../assets/images/image 7.png';
import pack from '../../assets/images/Pack.png';
import dash from '../../assets/images/Dash.png';
import truck from '../../assets/images/Truck.png';
import maps from '../../assets/images/maps.png';
import faqs from '../../assets/images/FaQs.png';

function MenuComponent() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className={`${styles['menu-lateral']} ${menuOpen ? styles['menu-open'] : ''}`}>
      <div className={styles['menu-icon']} onClick={toggleMenu}>
        <img src={menuIcon} alt="Menu" />
        <h3>Dashboard</h3>
      </div>
      <div className={styles['menu']}>
        <ul className={styles['menu-list']}> 
          <li className={styles['menu-item']}> <img src={dash} alt="Dashboard" /> Dashboard</li> 
          <li className={styles['menu-item']}> <img src={truck} alt="Pedidos" /> Pedidos</li>
          <li className={styles['menu-item']}> <img src={pack} alt="Solicitações" /> Solicitações</li>
          <li className={styles['menu-item']}> <img src={maps} alt="Mapas" /> Mapas</li>
          <li className={styles['menu-item']}> <img src={faqs} alt="faQs" /> faQs</li>
        </ul>
      </div>
    </div>
  );
}

export default MenuComponent;
