import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { showMoreFilms } from "../../store/slices";
import { getNumberFilmsShown, getFilmsByGenre } from "../../store/selectors";
import { AppDispatch } from "../../types/store";

const ShowMoreButton = () => {
  const countFilmsShown = useSelector((state) => getNumberFilmsShown(state));
  const filmsList = useSelector((state) => getFilmsByGenre(state));
  const dispatch = useDispatch<AppDispatch>();

  const handleShowMore = () => {
    dispatch(showMoreFilms());
  };

  return (
    <div className="catalog__more">
      {countFilmsShown < filmsList.length && (
        <button
          className="catalog__button"
          type="button"
          onClick={handleShowMore}
        >
          Show more
        </button>
      )}
    </div>
  );
};

export default ShowMoreButton;
