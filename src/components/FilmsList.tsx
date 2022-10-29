import React from "react";
import Card from "./Card";
import { filmType } from "../types/filmType";
import LoadingSpinner from "./LoadingSpinner";

type typeProps = {
  filmsList: filmType[];
  isLoading: boolean;
};

const FilmsList = ({ filmsList, isLoading }: typeProps) => {
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
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        filmsList.map((film) => (
          <Card
            film={film}
            key={film.id}
            handleMouseOverFilm={handleMouseOverFilm}
            isPlaying={film.id === activeFilm}
          />
        ))
      )}
    </>
  );
};

export default FilmsList;
