import React from 'react';
import styles from "./styles.module.scss";
import { Icon } from '@iconify/react';
import searchIcon from '@iconify-icons/mdi/magnify';
import rdlog from '../../assets/images/rdlog.png';
import userIcon from "../../assets/images/user-icon.svg";
import expandArrowIcon from "../../assets/images/expand-header-icon.svg";

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
        <img src={userIcon} alt='UserIcon'  className={styles.userIcon}/>
     
        <div className={styles.userText}>
          <span >Bem-vinda,</span>
          <span className={styles.personContainer} >Cristina!</span>
        </div>
        <img className={styles.expandIcon} src={expandArrowIcon} alt='ExpandIcon'/>
      </div>

    </header>
  )
}
