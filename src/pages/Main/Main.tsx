import React from "react";
import FilmsList from "../../components/FilmsList/FilmsList";
import ListGenres from "./../../components/ListGenres/ListGenres";
import { AppDispatch } from "../../types/store";
import { useDispatch } from "react-redux";
import { fetchFilms } from "../../store/api-actions";
import FilmCardOnMain from "./../../components/FilmCardOnMain/FilmCardOnMain";
import ShowMoreButton from "../../components/ShowMoreButton/ShowMoreButton";
import { WhereFilmsList } from "../../const";
import { fetchPromoFilm } from "./../../store/api-actions";

const Main = function () {
  const dispatch = useDispatch<AppDispatch>();

  React.useEffect(() => {
    dispatch(fetchFilms());
    dispatch(fetchPromoFilm());
  }, []);

  return (
    <>
      <FilmCardOnMain />
      <div className="page-content">
        <section className="catalog">
          <h2 className="catalog__title visually-hidden">Catalog</h2>

          <ul className="catalog__genres-list">
            <ListGenres />
          </ul>

          <div className="catalog__films-list">
            <FilmsList whereFilmsList={WhereFilmsList.OnMainPage} />
          </div>

          <ShowMoreButton />
        </section>

        <footer className="page-footer">
          <div className="logo">
            <a className="logo__link logo__link--light">
              <span className="logo__letter logo__letter--1">W</span>
              <span className="logo__letter logo__letter--2">T</span>
              <span className="logo__letter logo__letter--3">W</span>
            </a>
          </div>

          <div className="copyright">
            <p>© 2019 What to watch Ltd.</p>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Main;
