import React from "react";

type propsType = {
  description: string;
  rating: number;
};

const FilmTabOverview = ({ rating, description }: propsType) => {
  return (
    <>
      <div className="film-rating">
        <div className="film-rating__score">{rating}</div>
        <p className="film-rating__meta">
          <span className="film-rating__level">Very good</span>
          <span className="film-rating__count">240 ratings</span>
        </p>
      </div>

      <div className="film-card__text">
        {description}

        <p className="film-card__director">
          <strong>Director: Wes Anderson</strong>
        </p>

        <p className="film-card__starring">
          <strong>
            Starring: Bill Murray, Edward Norton, Jude Law, Willem Dafoe and
            other
          </strong>
        </p>
      </div>
    </>
  );
};

export default FilmTabOverview;
