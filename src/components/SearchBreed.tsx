import React, { ChangeEvent, FC, KeyboardEvent, useCallback, useEffect, useState } from "react";
import styles from "./SearchBreed.module.scss";

const PLACEHOLDER = "Search Breed";
const KEY_ENTER = "Enter";
const MIN_SEARCH_LENGTH = 2;

interface SearchBreedProps {
  query: string;
  performSearch: (search: string) => {};
}

const SearchBreeds: FC<SearchBreedProps> = ({ query, performSearch }) => {
  const [search, setSearch] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  useEffect(() => {
    if (query) {
      setSearch(query);
    }
  }, [query]);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);

    if (search.length >= MIN_SEARCH_LENGTH) {
      setErrorMessage("");
    }
  }

  const isValid = useCallback(() => {
    if (search.length < MIN_SEARCH_LENGTH) {
      setErrorMessage(`Please enter at least ${MIN_SEARCH_LENGTH} characters`);

      return false;
    }

    setErrorMessage("");

    return true;
  }, [search]);

  const onSearchClick = () => {
    if (isValid()) {
      performSearch(search);
    }
  }

  const onKeyUp = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === KEY_ENTER) {
      if (isValid()) {
        performSearch(search);
      }
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
      {errorMessage && (
        <div className={styles.error}>{errorMessage}</div>
      )}
    </div>
  )
};

export default SearchBreeds;
