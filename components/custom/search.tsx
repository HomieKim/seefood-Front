import React from "react";
import styles from "styles/custom/search.module.scss";
import SearchIcon from "public/icons/search.svg";

interface Props {
  searchHandler: () => void;
  placeHolder: string;
  value: string;
  changeHandler: (e: any) => void;
}

const SearchBar = ({
  searchHandler,
  placeHolder,
  value,
  changeHandler,
}: Props) => {
  return (
    <div className={styles.wrapper}>
      <input
        className={styles.input}
        type="text"
        value={value}
        onChange={changeHandler}
        placeholder={placeHolder}
      />
      <button className={styles.button} onClick={searchHandler}>
        <SearchIcon fill="#00ac77" />
      </button>
    </div>
  );
};

export default SearchBar;
