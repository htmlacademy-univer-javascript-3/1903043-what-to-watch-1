import React from "react";
import Card from "../card/card";
import { filmType } from "../../types/film-type";
import LoadingSpinner from "../loading-spinner/loading-spinner";
import {
  getNumberFilmsShown,
  getFilmsByGenre,
  getIsLoadingStatus,
  getSimilarFilms,
} from "../../store/selectors";
import { useSelector, useDispatch } from "react-redux";
import { LoadingStatus, WhereFilmsList } from "../../const";
import { AppDispatch } from "../../types/store";
import { getMyList } from "../../store/selectors";

type propsType = {
  whereFilmsList: WhereFilmsList;
};

const FilmsList = ({ whereFilmsList }: propsType) => {
  const countFilmsShown = useSelector((state) => getNumberFilmsShown(state));
  const filmsList: filmType[] = useSelector((state) => {
    if (whereFilmsList == WhereFilmsList.OnMainPage) {
      return getFilmsByGenre(state);
    }
    if (whereFilmsList == WhereFilmsList.OnMyList) {
      return getMyList(state);
    }
    if (whereFilmsList == WhereFilmsList.SimilarFilms) {
      return getSimilarFilms(state);
    }
    return [];
  });

  const isLoading = useSelector((state) => getIsLoadingStatus(state));
  const [activeFilm, setActiveFilm] = React.useState<number | null>(null);

  React.useEffect(() => {
    const handleMouseOver = (e: any) => {
      if (
        !e?.target?.parentElement?.classList?.contains("small-film-card") &&
        !e?.target?.parentElement?.classList?.contains("film-link")
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
      {isLoading === LoadingStatus.True ? (
        <LoadingSpinner />
      ) : (
        filmsList
          .slice(0, countFilmsShown)
          .map((film) => (
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
