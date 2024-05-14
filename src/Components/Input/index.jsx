import { Icon } from "@iconify/react/dist/iconify";
import searchIcon from "@iconify-icons/mdi/magnify";

import styles from "./Input.module.scss";

export const Input = ({
  searchInput = false,
  onChange,
  placeholder,
  type = "text",
  value,
}) => {
  return (
    <div className={styles.container}>
      <input onChange={onChange} placeholder={placeholder} value={value} type={type} />
      {searchInput && <Icon icon={searchIcon} className={styles.search_icon} />}
    </div>
  );
};
