import React from "react";
import { APIRoute, AppRoute } from "../../const";
import { filmType } from "../../types/film-type";
import { AuthInfoBlock } from "../auth-info-block/auth-info-block";
import CustomLink from "../custom-link/custom-link";

type propsType = {
  film: filmType | null;
  id: number;
};

const FilmCardOnAddReview = ({ film, id }: propsType) => {
  return (
    <div className="film-card__header">
      <div className="film-card__bg">
        <img src={film?.backgroundImage} alt={film?.name} />
      </div>

      <h1 className="visually-hidden">WTW</h1>

      <header className="page-header">
        <div className="logo">
          <CustomLink to={AppRoute.Main} className="logo__link">
            <span className="logo__letter logo__letter--1">W</span>
            <span className="logo__letter logo__letter--2">T</span>
            <span className="logo__letter logo__letter--3">W</span>
          </CustomLink>
        </div>

        <nav className="breadcrumbs">
          <ul className="breadcrumbs__list">
            <li className="breadcrumbs__item">
              <CustomLink
                to={`${APIRoute.Films}/${id}`}
                className="breadcrumbs__link"
              >
                {film?.name}
              </CustomLink>
            </li>
            <li className="breadcrumbs__item">
              <span className="breadcrumbs__link">Add review</span>
            </li>
          </ul>
        </nav>

        <ul className="user-block">
          <AuthInfoBlock />
        </ul>
      </header>

      <div className="film-card__poster film-card__poster--small">
        <img
          src={film?.posterImage}
          alt={film?.name}
          width="218"
          height="327"
        />
      </div>
    </div>
  );
};

export default React.memo(FilmCardOnAddReview);
