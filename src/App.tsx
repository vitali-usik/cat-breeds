import React, { useEffect, useRef, useState } from 'react';
import SearchBreeds from "./components/SearchBreed";
import BreedCard from "./components/BreedCard";
import Suggestions from "./components/Suggestions";
import { Breed } from "./types/types";
import generateRandomApiError from "./utils/generateRandomApiError";
import styles from './App.module.scss';

/**
 * TODO
 * add image loading?
 */

function App() {
  const [breeds, setBreeds] = useState<Breed[]>([]);
  const [searchResults, setSearchResults] = useState<Breed[]>([]);
  const [isError, setIsError] = useState<boolean>(false);
  const [query, setQuery] = useState<string>("");
  const isLoadingRef = useRef<boolean>(false);

  const fetchData = async () => {
    try {
      isLoadingRef.current = true;

      generateRandomApiError(); // mock server api error, trigger each fifth request

      const response = await fetch("https://api.thecatapi.com/v1/breeds");
      const breedsData = await response.json();

      isLoadingRef.current = false;

      setBreeds(breedsData);
      setIsError(false);
    } catch (e) {
      console.error("Server error", e);
      setIsError(true);
    }
  };

  useEffect(() => {
    if (isLoadingRef.current) {
      return;
    }

    fetchData();
  }, []);

  const onSuggestionClick = (breed: string) => {
    setQuery(breed);
    performSearch(breed);
  }

  const performSearch = async (search: string) => {
    try {
      const response = await fetch(`https://api.thecatapi.com/v1/breeds/search?q=${search}`);
      const breedsData = await response.json();

      setSearchResults(breedsData);
    } catch (e) {
      console.error("Server error", e);
    }
  }

  const retry = () => {
    isLoadingRef.current = false;
    fetchData();
  }

  return (
    <div className={styles.root}>
      <SearchBreeds query={query} performSearch={performSearch} />

      {isError ? (
        <div className={styles.error}>
          <div>Something went wrong.</div>
          <button onClick={retry}>Retry</button>
        </div>
      ) : (
        <Suggestions breeds={breeds} onSuggestionClick={onSuggestionClick} />
      )}
      <div className={styles.results}>
        {searchResults.map(({ name, id, description, origin, temperament }) => (
          <BreedCard
            key={id}
            name={name}
            description={description}
            origin={origin}
            temperament={temperament}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
