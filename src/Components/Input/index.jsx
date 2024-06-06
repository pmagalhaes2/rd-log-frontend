import React from "react";
import styles from "./Input.module.scss";
import { Icon } from "@iconify/react/dist/iconify";
import searchIcon from "@iconify-icons/mdi/magnify";

export const Input = React.forwardRef(
  (
    {
      searchInput = false,
      onChange,
      placeholder,
      type = "text",
      value,
      required = true,
      label,
      freeSize = true,
      defaultValue,
      disabled = false,
      onClick
    },
    ref
  ) => {
    return (
      <div className={`${styles.container} ${freeSize ? styles.freeSize : ""}`}>
        {label && <label>{label}</label>}
        <div className={styles.input_container}>
          <input
            ref={ref}
            onChange={onChange}
            placeholder={placeholder}
            value={value}
            type={type}
            required={required}
            className={freeSize ? styles.fullWidth : ""}
            defaultValue={defaultValue}
            disabled={disabled}
          />
          {searchInput && (
            <Icon icon={searchIcon} className={styles.search_icon} onClick={onClick} />
          )}
        </div>
      </div>
    );
  }
);
