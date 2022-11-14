import React from "react";
import FormReview from "./FormReview/FormReview";
import { useSelector, useDispatch } from "react-redux";
import { APIRoute, AppRoute } from "../../const";
import { Link } from "react-router-dom";
import AuthInfoBlock from "../../components/AuthInfoBlock/AuthInfoBlock";
import {
  getAuthorizationStatus,
  getSelectedFilm,
} from "./../../store/selectors";
import { AppDispatch } from "../../types/store";
import { fetchSelectedFilm } from "../../store/api-actions";
import Stars from "../../components/Stars/Stars";
import FilmCardOnAddReview from "../../components/FilmCardOnAddReview/FilmCardOnAddReview";

const AddReview = () => {
  const id = Number(window.location.href.split("/").at(-2));
  const film = useSelector((state) => getSelectedFilm(state));
  const [countStars, setCountStars] = React.useState<null | number>(null);

  const dispatch = useDispatch<AppDispatch>();

  React.useEffect(() => {
    dispatch(fetchSelectedFilm({ id }));
  }, [id]);

  const handleChangeRating = (countStars: number) => {
    setCountStars(countStars);
  };

  return (
    <>
      <section className="film-card film-card--full">
        <FilmCardOnAddReview film={film} id={id} />

        <div className="add-review">
          <form action="#" className="add-review__form">
            <Stars handleChangeRating={handleChangeRating} />
            {film && <FormReview rating={countStars} id={film?.id} />}
          </form>
        </div>
      </section>
    </>
  );
};

export default AddReview;
