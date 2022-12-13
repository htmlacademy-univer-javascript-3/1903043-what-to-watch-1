import React from "react";
import FormReview from "./form-review/form-review";
import { useSelector, useDispatch } from "react-redux";
import { getIsLoadingStatus, getSelectedFilm } from "../../store/selectors";
import { AppDispatch } from "../../types/store";
import { fetchSelectedFilm } from "../../store/api-actions";
import Stars from "../../components/stars/stars";
import FilmCardOnAddReview from "../../components/film-card-on-add-review/film-card-on-add-review";
import { useNavigate, useParams } from "react-router-dom";
import { APIRoute, LoadingStatus } from "../../const";

const AddReview = () => {
  const id: number = useParams() ? Number(useParams().id) : -1;
  const isLoading = useSelector((state) => getIsLoadingStatus(state));
  const film = useSelector((state) => getSelectedFilm(state));
  const [countStars, setCountStars] = React.useState<null | number>(null);

  const dispatch = useDispatch<AppDispatch>();

  React.useEffect(() => {
    dispatch(fetchSelectedFilm({ id }));
  }, [id]);

  const navigate = useNavigate();
  if (isLoading == LoadingStatus.Error) {
    navigate(APIRoute.NotFound);
  }

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
