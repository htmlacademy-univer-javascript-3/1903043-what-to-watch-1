import React from "react";
import { Link } from "react-router-dom";
import { filmType } from "../types/filmType";

type typeProps = {
  film: filmType;
  handleMouseOver: (filmId: number) => void;
};

function Card({ film, handleMouseOver }: typeProps) {
  const { id, imgUrl, title } = film;

  return (
    <article
      className="small-film-card catalog__films-card"
      onMouseOver={() => handleMouseOver(5)}
    >
      <Link to={`films/${id}`}>
        <div className="small-film-card__image">
          <img src={imgUrl} alt={title} width="280" height="175" />
        </div>
        <h3 className="small-film-card__title">
          <span className="small-film-card__link">{title}</span>
        </h3>
      </Link>
    </article>
  );
}

export default Card;
