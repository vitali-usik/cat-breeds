import React, { FC } from "react";
import { Breed } from "../types/types";
import styles from "./BreedCard.module.scss";

type BreedCardProps = Pick<Breed, "name" | "description" | "origin" | "temperament"> & { image?: string };

const BreedCard: FC<BreedCardProps> = ({ name, description, origin, temperament, image }) => {
  return (
    <div
      className={styles.result}
    >
      <h3 className={styles.name}>{name}</h3>
      <img className={styles.img} src={image} alt="" />
      <p className={styles.info}>
        <b>Origin country:</b> {origin}</p>
      <p className={styles.info}>
        <b>Temperament:</b> {temperament}</p>
      <p className={styles.description}>{description}</p>
    </div>
  )
}

export default BreedCard;
