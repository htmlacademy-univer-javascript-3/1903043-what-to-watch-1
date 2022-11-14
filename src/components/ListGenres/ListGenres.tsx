import React from "react";
import { FilmGenres } from "../../const";
import { setGenre } from "../../store/slices";
import { useDispatch, useSelector } from "react-redux";
import { getGenre } from "./../../store/selectors";

const ListGenres = () => {
  const activeGenre = useSelector((state) => getGenre(state));
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
