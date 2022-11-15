import React from "react";
import AuthInfoBlock from "../AuthInfoBlock/AuthInfoBlock";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  getAuthorizationStatus,
  getFilmsByGenre,
  getMyList,
} from "./../../store/selectors";
import FavoriteButton from "../FavoriteButton/FavoriteButton";

const FilmCardOnMain = () => {
  const film = useSelector((state) => getFilmsByGenre(state))
    ? useSelector((state) => getFilmsByGenre(state))[0]
    : null;
  const authorizationStatus = useSelector((state) =>
    getAuthorizationStatus(state)
  );
  const navigate = useNavigate();

  const handlePlay = () => {
    navigate(`/player/${film?.id}`);
  };

  return (
    <section className="film-card">
      <div className="film-card__bg">
        <img src={film?.backgroundImage} alt={film?.name} />
      </div>

      <h1 className="visually-hidden">WTW</h1>

      <header className="page-header film-card__head">
        <div className="logo">
          <a className="logo__link">
            <span className="logo__letter logo__letter--1">W</span>
            <span className="logo__letter logo__letter--2">T</span>
            <span className="logo__letter logo__letter--3">W</span>
          </a>
        </div>

        <ul className="user-block">
          <AuthInfoBlock />
        </ul>
      </header>

      <div className="film-card__wrap">
        <div className="film-card__info">
          <div className="film-card__poster">
            <img
              src={film?.posterImage}
              alt={film?.name}
              width="218"
              height="327"
            />
          </div>

          <div className="film-card__desc">
            <h2 className="film-card__title">{film?.name}</h2>
            <p className="film-card__meta">
              <span className="film-card__genre">{film?.genre}</span>
              <span className="film-card__year">{film?.released}</span>
            </p>

            <div className="film-card__buttons">
              <button
                className="btn btn--play film-card__button"
                type="button"
                onClick={handlePlay}
              >
                <svg viewBox="0 0 19 19" width="19" height="19">
                  <use xlinkHref="#play-s"></use>
                </svg>
                <span>Play</span>
              </button>

              {film && (
                <FavoriteButton
                  id={film.id}
                  film={film}
                  authorizationStatus={authorizationStatus}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FilmCardOnMain;
