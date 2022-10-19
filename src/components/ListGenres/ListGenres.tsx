import React from "react";
import { FilmGenres } from "../../const";
import { setGenre } from "../../store/filmsSlice";
import { useDispatch } from "react-redux";

type propsType = {
  activeGenre: FilmGenres;
};

const ListGenres = ({ activeGenre }: propsType) => {
  const dispatch = useDispatch();

  const onClickGenre = (genre: FilmGenres) => {
    dispatch(setGenre(genre));
  };

  return (
    <>
      {Object.values(FilmGenres).map((genre) => (
        <li
          className={`catalog__genres-item ${
            activeGenre === genre && "catalog__genres-item--active"
          }`}
          onClick={() => onClickGenre(genre)}
        >
          <a className="catalog__genres-link">{genre}</a>
        </li>
      ))}
    </>
  );
};

export default ListGenres;
