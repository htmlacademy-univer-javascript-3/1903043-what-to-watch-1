import React from "react";
import { APIRoute } from "../../const";
import { comment } from "../../types/comment";
import { createAPI } from "./../../services/api";
import { useNavigate } from "react-router-dom";

type propsType = {
  id: number;
};

const FilmTabReviews = ({ id }: propsType) => {
  const api = createAPI();
  const [comments, setComments] = React.useState<comment[]>([]);

  React.useEffect(() => {
    const fetchComments = async () => {
      try {
        const { data: commentsData } = await api.get<comment[]>(
          `${APIRoute.Comments}/${id}`
        );
        setComments(commentsData);
        console.log(commentsData);
      } catch (error: any) {
        console.log(error.mistake);
      }
    };
    fetchComments();
  }, [id]);

  return (
    <div className="film-card__reviews film-card__row">
      <div className="film-card__reviews-col">
        {comments.slice(0, (comments.length + 1) / 2).map((comment) => (
          <div className="review">
            <blockquote className="review__quote">
              <p className="review__text">{comment.comment}</p>

              <footer className="review__details">
                <cite className="review__author">{comment.user.name}</cite>
                <time className="review__date" dateTime={comment.date}>
                  {comment.date}
                </time>
              </footer>
            </blockquote>

            <div className="review__rating">{comment.rating}</div>
          </div>
        ))}
      </div>
      <div className="film-card__reviews-col">
        {comments.slice((comments.length + 1) / 2).map((comment) => (
          <div className="review">
            <blockquote className="review__quote">
              <p className="review__text">{comment.comment}</p>

              <footer className="review__details">
                <cite className="review__author">{comment.user.name}</cite>
                <time className="review__date" dateTime={comment.date}>
                  {comment.date}
                </time>
              </footer>
            </blockquote>

            <div className="review__rating">{comment.rating}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FilmTabReviews;
