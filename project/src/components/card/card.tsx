import React from "react";
import { filmType } from "../../types/film-type";
import VideoPlayer from "../video-player/video-player";
import CustomLink from "../custom-link/custom-link";
import { resetNumberFilmsShown } from "../../store/slices";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../types/store";
import { useNavigate } from "react-router-dom";

type typeProps = {
  film: filmType;
  isPlaying?: boolean;
  handleMouseOverFilm?: (filmId: number) => void;
};

function Card({ film, handleMouseOverFilm, isPlaying }: typeProps) {
  const { id, previewImage, name, previewVideoLink } = film;

  let timeout: any;

  const setTimeOutOver = () => {
    if (!handleMouseOverFilm) return;
    timeout = setTimeout(() => handleMouseOverFilm(id), 1000);
  };

  const clearTimeOutOver = () => {
    clearTimeout(timeout);
  };

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handleClickLink = () => {
    navigate(`/films/${id}`);
    dispatch(resetNumberFilmsShown());
  };

  return (
    <article
      className={`small-film-card catalog__films-card ${id}`}
      onMouseOver={setTimeOutOver}
      onMouseOut={clearTimeOutOver}
      onClick={handleClickLink}
      style={{ cursor: "pointer" }}
    >
      {isPlaying ? (
        <VideoPlayer src={previewVideoLink} muted autoPlay />
      ) : (
        <div className="film-link">
          <div className="small-film-card__image">
            <img src={previewImage} alt={name} width="280" height="175" />
          </div>
          <h3 className="small-film-card__title">
            <span className="small-film-card__link">{name}</span>
          </h3>
        </div>
      )}
    </article>
  );
}

export default Card;
