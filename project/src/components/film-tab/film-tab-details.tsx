import React from "react";

type propsType = {
  director: string;
  runTime: number;
  starring: string[];
  genre: string;
  released: number;
};

const FilmTabDetails = ({
  director,
  runTime,
  starring,
  genre,
  released,
}: propsType) => {
  const getCorrectFormatRunTime = () => {
    const hours = Math.floor(+runTime / 60);
    const minutes = +runTime % 60;
    return `${hours}h ${minutes}m`;
  };

  return (
    <div className="film-card__text film-card__row">
      <div className="film-card__text-col">
        <p className="film-card__details-item">
          <strong className="film-card__details-name">Director</strong>
          <span className="film-card__details-value">{director}</span>
        </p>
        <p className="film-card__details-item">
          <strong className="film-card__details-name">Starring</strong>
          <span className="film-card__details-value">
            {starring.map((star, i) => (
              <div key={i}>
                {star}
                <br />
              </div>
            ))}
          </span>
        </p>
      </div>

      <div className="film-card__text-col">
        <p className="film-card__details-item">
          <strong className="film-card__details-name">Run Time</strong>
          <span className="film-card__details-value">
            {getCorrectFormatRunTime()}
          </span>
        </p>
        <p className="film-card__details-item">
          <strong className="film-card__details-name">Genre</strong>
          <span className="film-card__details-value">{genre}</span>
        </p>
        <p className="film-card__details-item">
          <strong className="film-card__details-name">Released</strong>
          <span className="film-card__details-value">{released}</span>
        </p>
      </div>
    </div>
  );
};

export default FilmTabDetails;
