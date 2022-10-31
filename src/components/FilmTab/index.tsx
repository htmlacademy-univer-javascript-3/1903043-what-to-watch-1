import React from "react";
import { FilmTabName } from "../../const";
import { filmType } from "../../types/filmType";
import FilmTabDetails from "./FilmTabDetails";
import FilmTabOverview from "./FilmTabOverview";
import FilmTabReviews from "./FilmTabReviews";

type propsType = {
  film: filmType;
  activeTab: FilmTabName;
};

const FilmTab = ({ activeTab, film }: propsType) => {
  if (activeTab == FilmTabName.Overview)
    return (
      <FilmTabOverview
        rating={film.rating}
        scoresCount={film.scoresCount}
        description={film.description}
        director={film.director}
        starring={film.starring}
      />
    );

  if (activeTab == FilmTabName.Details)
    return (
      <FilmTabDetails
        director={film.director}
        runTime={film.runTime}
        starring={film.starring}
        genre={film.genre}
        released={film.released}
      />
    );

  return <FilmTabReviews id={film.id} />;
};

export default FilmTab;
