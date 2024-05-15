import { Icon } from "@iconify/react/dist/iconify";
import searchIcon from "@iconify-icons/mdi/magnify";

import styles from "./Input.module.scss";

export const Input = ({
  searchInput = false,
  onChange,
  placeholder,
  type = "text",
  value,
  required = true,
  label,
}) => {
  return (
    <>
      {label && <label>{label}</label>}
      <div className={styles.container}>
        <input
          onChange={onChange}
          placeholder={placeholder}
          value={value}
          type={type}
          required={required}
        />
        {searchInput && (
          <Icon icon={searchIcon} className={styles.search_icon} />
        )}
      </div>
    </>
  );
};
