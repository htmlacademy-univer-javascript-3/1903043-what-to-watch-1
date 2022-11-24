import React, { ChangeEvent } from "react";
import { APIRoute } from "../../../const";
import { createAPI } from "./../../../services/api";
import { useNavigate } from "react-router-dom";

type propsType = {
  rating: number | null;
  id: number;
};

const FormReview = ({ rating, id }: propsType) => {
  const [review, setReview] = React.useState<string>("");
  const [isFormDisabled, setIsFormDisabled] = React.useState<boolean>(false);
  const api = createAPI();
  const navigate = useNavigate();

  const isReviewCorrect = (): boolean => {
    return !(review.length < 50 || review.length > 400 || rating === null);
  };

  const handlePostComment = async (e: any) => {
    e.preventDefault();
    try {
      setIsFormDisabled(true);
      await api.post(`${APIRoute.Comments}/${id}`, {
        comment: review,
        rating,
      });
      alert("Комментарий был успешно добавлен");
      navigate(`${APIRoute.Films}/${id}`);
    } catch (error: any) {
      alert(`При добавлении комментария произошла ошибка, ${error.message}`);
    }
    setIsFormDisabled(false);
  };

  const handleTextarea = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setReview(e.target.value);
  };

  return (
    <div className="add-review__text">
      <textarea
        className="add-review__textarea"
        name="review-text"
        id="review-text"
        placeholder="Review text"
        onChange={handleTextarea}
        disabled={isFormDisabled}
      ></textarea>
      <div className="add-review__submit">
        <button
          className="add-review__btn"
          type="submit"
          onClick={handlePostComment}
          disabled={!isReviewCorrect() || isFormDisabled}
        >
          Post
        </button>
      </div>
    </div>
  );
};

export default FormReview;
