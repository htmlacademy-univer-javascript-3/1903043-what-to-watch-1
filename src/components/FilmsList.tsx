import React from "react";
import Card from "./Card";
import { filmType } from "../types/filmType";

type typeProps = {
  filmsList: filmType[];
};

const FilmsList = ({ filmsList }: typeProps) => {
  const [activeFilm, setActiveFilm] = React.useState(-1);

  const handleMouseOver = (filmId: number) => {
    setActiveFilm(filmId);
    console.log(filmId);
  };

  return (
    <>
      {filmsList.map((film) => (
        <Card film={film} key={film.id} handleMouseOver={handleMouseOver} />
      ))}
    </>
  );
};

export default FilmsList;
