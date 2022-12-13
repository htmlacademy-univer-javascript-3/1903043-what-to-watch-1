import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteFilmFromFavorite,
  fetchPromoFilm,
} from "../../store/api-actions";
import { AppDispatch } from "../../types/store";
import { useNavigate } from "react-router-dom";
import { AppRoute, AuthorizationStatus } from "../../const";
import { addFilmToFavorite } from "../../store/api-actions";
import { filmType } from "../../types/film-type";
import { getMyList, getPromoFilm } from "../../store/selectors";

type propsType = {
  id: number;
  film: filmType | null;
  authorizationStatus: AuthorizationStatus;
};

const FavoriteButton = ({ id, film, authorizationStatus }: propsType) => {
  const isPromoFilm = useSelector((state) => getPromoFilm(state))?.id == id;
  const myList = useSelector((state) => getMyList(state));
  const navigate = useNavigate();

  const dispatch = useDispatch<AppDispatch>();

  const handleDeleteFilm = async () => {
    if (authorizationStatus === AuthorizationStatus.Auth) {
      await dispatch(deleteFilmFromFavorite({ id }));
      if (isPromoFilm) {
        dispatch(fetchPromoFilm());
      }
    } else {
      navigate(AppRoute.Login);
    }
  };

  const handleAddFilm = async () => {
    if (authorizationStatus === AuthorizationStatus.Auth) {
      await dispatch(addFilmToFavorite({ id }));
      if (isPromoFilm) {
        dispatch(fetchPromoFilm());
      }
    } else {
      navigate(AppRoute.Login);
    }
  };

  return (
    <>
      {film?.isFavorite ? (
        <button
          className="btn btn--list film-card__button"
          type="button"
          onClick={handleDeleteFilm}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="35"
            height="35"
            fill="currentColor"
            viewBox="0 0 16 16"
          >
            <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z" />
          </svg>
          <span>My list</span>
          <span className="film-card__count">
            {myList ? myList.length : "0"}
          </span>
        </button>
      ) : (
        <button
          className="btn btn--list film-card__button"
          type="button"
          onClick={handleAddFilm}
        >
          <svg viewBox="0 0 19 20" width="19" height="20">
            <use xlinkHref="#add"></use>
          </svg>
          <span>My list</span>
          <span className="film-card__count">{myList.length}</span>
        </button>
      )}
    </>
  );
};

export default FavoriteButton;
