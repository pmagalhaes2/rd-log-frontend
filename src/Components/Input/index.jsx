import searchIcon from "../../assets/images/search-icon.svg";

import styles from "./Input.module.scss";

export const Input = ({ onChange, placeholder, value }) => {
  return (
    <div className={styles.container}>
      <input onChange={onChange} placeholder={placeholder} value={value}/>
      <img src={searchIcon} alt="Ícone de busca" />
    </div>
  );
};
