import React from 'react';
import styles from "./styles.module.scss";
import { Icon } from '@iconify/react';
import userIcon from '@iconify-icons/mdi/user-outline';
import searchIcon from '@iconify-icons/mdi/magnify';
import rdlog from './rdlog.png';
// import arrowDownIcon from '@iconify-icons/ion/arrow-down';

export default function Header() {
  return (
    <header className={styles.headerContainer}>
      <img className={styles.logo} src={rdlog} alt='RDLog'/>
      
      <div className={styles.searchContainer}>
        <Icon icon={searchIcon} className={styles.searchIcon} />
        <input className={styles.searchInput} type="text" placeholder="O que você precisa?" />
      </div>
      <div className={styles.separator}></div>

      <div className={styles.userSection}>
        <div className={styles.userText}>
          <Icon icon={userIcon} className={styles.userIcon} />
          <span>Bem-vinda,</span>
        </div>
        <div className={styles.personContainer}>
          <span>Cristina!</span>
          {/* <Icon icon={arrowDownIcon} className={styles.expandIcon} /> */}
        </div>
      </div>
    </header>
  )
}

