import React, { FC } from "react";
import { Breed } from "../types/types";
import styles from "./Suggestions.module.scss";

interface SuggestionsProps {
  breeds: Breed[];
  onSuggestionClick: (name: string) => void;
}

const Suggestions: FC<SuggestionsProps> = ({ breeds, onSuggestionClick }) => {
  return (
    <>
      <h3 className={styles.title}>Suggestions</h3>
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
    </>
  )
}

export default Suggestions;
