import React from "react";
import { NameAssesment } from "../../const";

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
  const getNameAssesment = () => {
    let nameAssesment = "";
    if (0 <= rating && rating < 3) {
      nameAssesment = NameAssesment.Bad;
    } else if (3 <= rating && rating < 5) {
      nameAssesment = NameAssesment.Normal;
    } else if (5 <= rating && rating < 8) {
      nameAssesment = NameAssesment.Good;
    } else if (8 <= rating && rating < 10) {
      nameAssesment = NameAssesment.VeryGood;
    } else if (rating == 10) {
      nameAssesment = NameAssesment.Awesome;
    }
    return nameAssesment;
  };

  return (
    <>
      <div className="film-rating">
        <div className="film-rating__score">{rating}</div>
        <p className="film-rating__meta">
          <span className="film-rating__level">{getNameAssesment()}</span>
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
