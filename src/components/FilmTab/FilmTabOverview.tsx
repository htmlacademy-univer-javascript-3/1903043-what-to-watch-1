import React from "react";

type propsType = {
  description: string;
  rating: number;
  scoresCount: number;
  director: string;
  starring: string[];
};

const FilmTabOverview = ({
  rating,
  description,
  scoresCount,
  director,
  starring,
}: propsType) => {
  return (
    <>
      <div className="film-rating">
        <div className="film-rating__score">{rating}</div>
        <p className="film-rating__meta">
          <span className="film-rating__level">
            {rating > 5 ? "Good" : "Bad"}
          </span>
          <span className="film-rating__count">{scoresCount} ratings</span>
        </p>
      </div>

      <div className="film-card__text">
        {description}

        <p className="film-card__director">
          <strong>Director: {director}</strong>
        </p>

        <p className="film-card__starring">
          <strong>Starring: {starring.join(", ")} and other</strong>
        </p>
      </div>
    </>
  );
};

export default FilmTabOverview;
