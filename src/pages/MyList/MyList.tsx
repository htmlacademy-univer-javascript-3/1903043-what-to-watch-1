import React from "react";
import FilmsList from "../../components/FilmsList/FilmsList";
import { AppRoute } from "../../const";
import { filmType } from "../../types/filmType";
import { useSelector } from "react-redux";
import { getIsLoadingStatus, getUserData } from "../../store/selectors";
import { getMyList } from "./../../store/selectors";
import { WhereFilmsList } from "../../const";
import CustomLink from "../../custom-link/CustomLink";

const MyList = () => {
  const { avatarUrl } = useSelector((state) => getUserData(state));
  const myList: filmType[] = useSelector((state) => getMyList(state));

  return (
    <>
      <div className="user-page">
        <header className="page-header user-page__head">
          <div className="logo">
            <CustomLink to={AppRoute.Main} className="logo__link">
              <span className="logo__letter logo__letter--1">W</span>
              <span className="logo__letter logo__letter--2">T</span>
              <span className="logo__letter logo__letter--3">W</span>
            </CustomLink>
          </div>

          <h1 className="page-title user-page__title">
            My list{" "}
            <span className="user-page__film-count">{myList.length}</span>
          </h1>
          <ul className="user-block">
            <li className="user-block__item">
              <div className="user-block__avatar">
                <img
                  src={`${avatarUrl || "img/avatar.jpg"}`}
                  alt="User avatar"
                  width="63"
                  height="63"
                />
              </div>
            </li>
            <li className="user-block__item">
              <a className="user-block__link">Sign out</a>
            </li>
          </ul>
        </header>

        <section className="catalog">
          <h2 className="catalog__title visually-hidden">Catalog</h2>

          <div className="catalog__films-list">
            <FilmsList whereFilmsList={WhereFilmsList.OnMyList} />
          </div>
        </section>

        <footer className="page-footer">
          <div className="logo">
            <CustomLink
              to={AppRoute.Main}
              className="logo__link logo__link--light"
            >
              <span className="logo__letter logo__letter--1">W</span>
              <span className="logo__letter logo__letter--2">T</span>
              <span className="logo__letter logo__letter--3">W</span>
            </CustomLink>
          </div>

          <div className="copyright">
            <p>© 2019 What to watch Ltd.</p>
          </div>
        </footer>
      </div>
    </>
  );
};

export default MyList;
