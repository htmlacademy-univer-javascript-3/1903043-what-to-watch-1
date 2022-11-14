import React from "react";
import { Link, useNavigate } from "react-router-dom";
import FilmTab from "./../../components/FilmTab/";
import {
  APIRoute,
  AppRoute,
  AuthorizationStatus,
  LoadingStatus,
  WhereFilmsList,
} from "../../const";
import { AuthInfoBlock } from "./../../components/AuthInfoBlock/AuthInfoBlock";
import { useSelector, useDispatch } from "react-redux";
import {
  getAuthorizationStatus,
  getIsLoadingStatus,
  getSelectedFilm,
  getSimilarFilms,
} from "./../../store/selectors";
import { fetchSelectedFilm } from "../../store/api-actions";
import { AppDispatch } from "../../types/store";
import FilmsList from "./../../components/FilmsList";

const Film = () => {
  const id = Number(window.location.href.split("/").at(-1));
  const film = useSelector((state) => getSelectedFilm(state));
  const isLoading = useSelector((state) => getIsLoadingStatus(state));
  const similarFilms = useSelector((state) => getSimilarFilms(state));
  const authorizationStatus = useSelector((state) =>
    getAuthorizationStatus(state)
  );

  const dispatch = useDispatch<AppDispatch>();

  const navigate = useNavigate();
  if (isLoading == LoadingStatus.Error) {
    navigate(APIRoute.NotFound);
  }

  React.useEffect(() => {
    dispatch(fetchSelectedFilm({ id }));
  }, [id]);

  const handlePlay = () => {
    navigate(`/player/${film?.id}`);
  };

  const handleSeeList = () => {
    navigate(AppRoute.MyList);
  };

  const addReview = () => {
    navigate(AppRoute.AddReview);
  };

  return (
    <>
      <section className="film-card film-card--full">
        <div className="film-card__hero">
          <div className="film-card__bg">
            <img src={film?.backgroundImage} alt={film?.name} />
          </div>

          <h1 className="visually-hidden">WTW</h1>

          <header className="page-header film-card__head">
            <div className="logo">
              <Link to="/" className="logo__link">
                <span className="logo__letter logo__letter--1">W</span>
                <span className="logo__letter logo__letter--2">T</span>
                <span className="logo__letter logo__letter--3">W</span>
              </Link>
            </div>

            <ul className="user-block">
              <AuthInfoBlock />
            </ul>
          </header>

          <div className="film-card__wrap">
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
                <button
                  className="btn btn--list film-card__button"
                  type="button"
                  onClick={handleSeeList}
                >
                  <svg viewBox="0 0 19 20" width="19" height="20">
                    <use xlinkHref="#add"></use>
                  </svg>
                  <span>My list</span>
                  <span className="film-card__count">{"777"}</span>
                </button>
                {authorizationStatus == AuthorizationStatus.Auth && (
                  <span className="btn film-card__button" onClick={addReview}>
                    Add review
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="film-card__wrap film-card__translate-top">
          <div className="film-card__info">
            <div className="film-card__poster film-card__poster--big">
              <img
                src={film?.posterImage}
                alt={film?.name}
                width="218"
                height="327"
              />
            </div>

            {film && <FilmTab film={film} />}
          </div>
        </div>
      </section>

      <div className="page-content">
        <section className="catalog catalog--like-this">
          <h2 className="catalog__title">More like this</h2>

          <div className="catalog__films-list">
            {similarFilms && (
              <FilmsList whereFilmsList={WhereFilmsList.SimilarFilms} />
            )}
          </div>
        </section>

        <footer className="page-footer">
          <div className="logo">
            <a href="main.html" className="logo__link logo__link--light">
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

export default Film;
