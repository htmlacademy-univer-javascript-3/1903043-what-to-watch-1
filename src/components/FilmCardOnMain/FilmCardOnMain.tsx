import React from "react";
import AuthInfoBlock from "../AuthInfoBlock/AuthInfoBlock";
import { AppRoute } from "../../const";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { getMyList } from "./../../store/selectors";

const FilmCardOnMain = () => {
  const myListLength = useSelector((state) => getMyList(state)).length;
  const navigate = useNavigate();

  const handlePlay = () => {
    navigate("/player/1");
  };

  const handleSeeList = () => {
    navigate(AppRoute.MyList);
  };

  return (
    <section className="film-card">
      <div className="film-card__bg">
        <img
          src="img/bg-the-grand-budapest-hotel.jpg"
          alt="The Grand Budapest Hotel"
        />
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
              src="img/the-grand-budapest-hotel-poster.jpg"
              alt="The Grand Budapest Hotel poster"
              width="218"
              height="327"
            />
          </div>

          <div className="film-card__desc">
            <h2 className="film-card__title">The Grand Budapest Hotel</h2>
            <p className="film-card__meta">
              <span className="film-card__genre">Drama</span>
              <span className="film-card__year">2014</span>
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
              <button className="btn btn--list film-card__button" type="button">
                <svg viewBox="0 0 19 20" width="19" height="20">
                  <use xlinkHref="#add"></use>
                </svg>
                <span onClick={handleSeeList}>My list</span>
                <span className="film-card__count">{myListLength}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FilmCardOnMain;
