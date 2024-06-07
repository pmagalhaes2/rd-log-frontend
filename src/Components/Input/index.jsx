import React from "react";
import styles from "./Input.module.scss";
import { Icon } from "@iconify/react/dist/iconify";
import searchIcon from "@iconify-icons/mdi/magnify";
import ReactInputMask from "react-input-mask";

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
      onClick,
      mask,
    },
    ref
  ) => {
    const inputElement = mask ? (
      <ReactInputMask
        mask={mask}
        value={value}
        onChange={onChange}
        disabled={disabled}
      >
        {(inputProps) => (
          <input
            {...inputProps}
            ref={ref}
            placeholder={placeholder}
            type={type}
            required={required}
            className={freeSize ? styles.fullWidth : ""}
            defaultValue={defaultValue}
          />
        )}
      </ReactInputMask>
    ) : (
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
    );

    return (
      <div className={`${styles.container} ${freeSize ? styles.freeSize : ""}`}>
        {label && <label>{label}</label>}
        <div className={styles.input_container}>
          {inputElement}
          {searchInput && (
            <Icon
              icon={searchIcon}
              className={styles.search_icon}
              onClick={onClick}
            />
          )}
        </div>
      </div>
    );
  }
);
