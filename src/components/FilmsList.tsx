import React from "react";
import Card from "./Card";
import { filmType } from "../types/filmType";

type typeProps = {
  filmsList: filmType[];
};

const FilmsList = ({ filmsList }: typeProps) => {
  const [activeFilm, setActiveFilm] = React.useState<number | null>(null);

  React.useEffect(() => {
    const handleMouseOver = (e: any) => {
      if (
        !e.target.parentElement.classList.contains("small-film-card") &&
        !e.target.parentElement.classList.contains("film-link")
      ) {
        setActiveFilm(null);
      }
    };

    document.addEventListener("mouseover", handleMouseOver);
  }, []);

  const handleMouseOverFilm = (filmId: number) => {
    setActiveFilm(filmId);
  };

  return (
    <>
      {filmsList.map((film) => (
        <Card
          film={film}
          key={film.id}
          handleMouseOverFilm={handleMouseOverFilm}
          isPlaying={film.id === activeFilm}
        />
      ))}
    </>
  );
};

export default FilmsList;
