import React from "react";

type propsType = {
  handleChangeRating: (countStars: number) => void;
};

const Stars = ({ handleChangeRating }: propsType) => {
  const possibleStars = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  return (
    <div className="rating">
      <div className="rating__stars">
        {possibleStars.reverse().map((star) => (
          <>
            <input
              className="rating__input"
              id={`star-${star}`}
              type="radio"
              name="rating"
              value={star}
            />
            <label
              className="rating__label"
              htmlFor={`star-${star}`}
              onClick={() => handleChangeRating(star)}
            >
              Rating {star}
            </label>
          </>
        ))}
      </div>
    </div>
  );
};

export default Stars;
