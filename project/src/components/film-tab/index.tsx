import React from "react";
import { FilmTabName } from "../../const";
import { filmType } from "../../types/film-type";
import FilmTabDetails from "./film-tab-details";
import FilmTabOverview from "./film-tab-overview";
import FilmTabReviews from "./film-tab-reviews";

type propsType = {
  film: filmType;
};

const FilmTab = ({ film }: propsType) => {
  const [activeTab, setActiveTab] = React.useState(FilmTabName.Overview);
  return (
    <div className="film-card__desc">
      <nav className="film-nav film-card__nav">
        <ul className="film-nav__list">
          {Object.values(FilmTabName).map((filmTabName) => (
            <li
              className={`film-nav__item  ${
                filmTabName == activeTab ? "film-nav__item--active" : ""
              }`}
              onClick={() => setActiveTab(filmTabName)}
            >
              <a className="film-nav__link">{filmTabName}</a>
            </li>
          ))}
        </ul>
      </nav>

      {activeTab == FilmTabName.Overview ? (
        <FilmTabOverview
          rating={film.rating}
          scoresCount={film.scoresCount}
          description={film.description}
          director={film.director}
          starring={film.starring}
        />
      ) : activeTab === FilmTabName.Details ? (
        <FilmTabDetails
          director={film.director}
          runTime={film.runTime}
          starring={film.starring}
          genre={film.genre}
          released={film.released}
        />
      ) : (
        <FilmTabReviews id={film.id} />
      )}
    </div>
  );
};

export default FilmTab;
