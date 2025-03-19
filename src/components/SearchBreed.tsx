import React, { ChangeEvent, FC, KeyboardEvent, useEffect, useState } from "react";
import styles from "./SearchBreed.module.scss";

const PLACEHOLDER = "Search Breed";
const KEY_ENTER = "Enter";

interface SearchBreedProps {
  query: string;
  performSearch: (search: string) => {};
}

const SearchBreeds: FC<SearchBreedProps> = ({ query, performSearch }) => {
  const [search, setSearch] = useState<string>("");

  useEffect(() => {
    if (query) {
      setSearch(query);
    }
  }, [query]);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  }

  const onSearchClick = () => {
    performSearch(search);
  }

  const onKeyUp = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === KEY_ENTER) {
      performSearch(search);
    }
  }

  return (
    <div className={styles.root}>
      <div className={styles.search}>
        <input
          className={styles.input}
          placeholder={PLACEHOLDER}
          value={search}
          onChange={onChange}
          onKeyDown={onKeyUp}
        />
        <button
          className={styles.button}
          onClick={onSearchClick}
        >
          Search
        </button>
      </div>
    </div>
  )
};

export default SearchBreeds;
