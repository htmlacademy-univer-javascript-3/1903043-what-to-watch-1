import React from "react";
import { Link } from "react-router-dom";
import { filmType } from "../types/filmType";
import VideoPlayer from "./VideoPlayer";

type typeProps = {
  film: filmType;
  isPlaying?: boolean;
  handleMouseOverFilm?: (filmId: number) => void;
};

function Card({ film, handleMouseOverFilm, isPlaying }: typeProps) {
  const { id, previewImage, name, videoLink } = film;

  let timeout: any;

  const setTimeOutOver = () => {
    if (!handleMouseOverFilm) return;
    timeout = setTimeout(() => handleMouseOverFilm(id), 1000);
  };

  const clearTimeOutOver = () => {
    clearTimeout(timeout);
  };

  return (
    <article
      className={`small-film-card catalog__films-card ${id}`}
      onMouseOver={setTimeOutOver}
      onMouseOut={clearTimeOutOver}
    >
      {isPlaying ? (
        <VideoPlayer src={videoLink} muted autoPlay />
      ) : (
        <Link to={`/films/${id}`} className="film-link">
          <div className="small-film-card__image">
            <img src={previewImage} alt={name} width="280" height="175" />
          </div>
          <h3 className="small-film-card__title">
            <span className="small-film-card__link">{name}</span>
          </h3>
        </Link>
      )}
    </article>
  );
}

export default Card;
