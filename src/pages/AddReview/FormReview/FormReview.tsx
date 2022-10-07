import React from "react";

const FormReview = () => {
  const [review, setReview] = React.useState();

  const handleTextarea = (e: any) => {
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
      ></textarea>
      <div className="add-review__submit">
        <button className="add-review__btn" type="submit">
          Post
        </button>
      </div>
    </div>
  );
};

export default FormReview;
