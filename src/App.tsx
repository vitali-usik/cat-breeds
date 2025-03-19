import React, { useEffect, useRef, useState } from 'react';
import SearchBreeds from "./components/SearchBreed";
import BreedCard from "./components/BreedCard";
import { Breed } from "./types/types";
import styles from './App.module.scss';

/**
 * TODO
 * add custom error trigger to check error state
 * add validation for input field
 * add debounce
 * add image loading?
 */

function App() {
  const [breeds, setBreeds] = useState<Breed[]>([]);
  const [searchResults, setSearchResults] = useState<Breed[]>([]);
  const [query, setQuery] = useState<string>("");
  const isLoadingRef = useRef<boolean>(false);

  useEffect(() => {
    if (isLoadingRef.current) {
      return;
    }

    const fetchData = async () => {
      try {
        isLoadingRef.current = true;

        const response = await fetch("https://api.thecatapi.com/v1/breeds");
        const breedsData = await response.json();
        setBreeds(breedsData);
      } catch (e) {
        console.error("Server error", e);
      } finally {
        isLoadingRef.current = false;
      }
    };

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

  return (
    <div className={styles.root}>
      <SearchBreeds query={query} performSearch={performSearch} />
      <div className={styles.suggestions}>
        {breeds.map((breed) => (
          <span
            key={breed.id}
            className={styles.suggestion}
            onClick={() => onSuggestionClick(breed.name)}
          >
            {breed.name}
          </span>
        ))}
      </div>
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
