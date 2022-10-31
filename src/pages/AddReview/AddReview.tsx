import React from "react";
import { filmType } from "../../types/filmType";
import FormReview from "./FormReview/FormReview";
import { useSelector } from "react-redux";
import { APIRoute, AppRoute, AuthorizationStatus } from "../../const";
import { createAPI } from "./../../services/api";
import { Link } from "react-router-dom";
import AuthInfoBlock from "../../components/AuthInfoBlock/AuthInfoBlock";

const AddReview = () => {
  const id = Number(window.location.href.split("/").at(-2));
  const [film, setFilm] = React.useState<filmType>();
  const [countStars, setCountStars] = React.useState<null | number>(null);
  const possibleStars = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const authorizationStatus: AuthorizationStatus = useSelector(
    (state: any) => state.films.authorizationStatus
  );
  const api = createAPI();

  React.useEffect(() => {
    const fetchFilm = async () => {
      try {
        const { data: filmData } = await api.get<filmType>(
          `${APIRoute.Films}/${id}`
        );
        setFilm(filmData);
      } catch (error: any) {
        console.log(error);
      }
    };
    fetchFilm();
  }, [id]);

  const handleChangeRating = (countStars: number) => {
    setCountStars(countStars);
    console.log(countStars);
  };

  return (
    <>
      <div className="visually-hidden">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
        >
          <symbol id="add" viewBox="0 0 19 20">
            <title>+</title>
            <desc>Created with Sketch.</desc>
            <g
              id="Page-1"
              stroke="none"
              strokeWidth="1"
              fill="none"
              fillRule="evenodd"
            >
              <polygon
                id="+"
                fill="#EEE5B5"
                points="10.777832 11.2880859 10.777832 19.5527344 8.41650391 19.5527344 8.41650391 11.2880859 0.627929688 11.2880859 0.627929688 8.92675781 8.41650391 8.92675781 8.41650391 0.662109375 10.777832 0.662109375 10.777832 8.92675781 18.5664062 8.92675781 18.5664062 11.2880859"
              />
            </g>
          </symbol>
          <symbol id="full-screen" viewBox="0 0 27 27">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M23.8571 0H16V3.14286H23.8571V11H27V3.14286V0H23.8571Z"
              fill="#FFF9D9"
              fillOpacity="0.7"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M27 23.8571V16H23.8571V23.8571H16V27H23.8571H27L27 23.8571Z"
              fill="#FFF9D9"
              fillOpacity="0.7"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M0 3.14286L0 11H3.14286L3.14286 3.14286L11 3.14286V0H3.14286H0L0 3.14286Z"
              fill="#FFF9D9"
              fillOpacity="0.7"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M3.14286 27H11V23.8571H3.14286L3.14286 16H0L0 23.8571V27H3.14286Z"
              fill="#FFF9D9"
              fillOpacity="0.7"
            />
          </symbol>
          <symbol id="in-list" viewBox="0 0 18 14">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M2.40513 5.35353L6.1818 8.90902L15.5807 0L18 2.80485L6.18935 14L0 8.17346L2.40513 5.35353Z"
              fill="#EEE5B5"
            />
          </symbol>
          <symbol id="pause" viewBox="0 0 14 21">
            <title>Artboard</title>
            <desc>Created with Sketch.</desc>
            <g
              id="Artboard"
              stroke="none"
              strokeWidth="1"
              fill="none"
              fillRule="evenodd"
            >
              <polygon
                id="Line"
                fill="#EEE5B5"
                fillRule="nonzero"
                points="0 -1.11910481e-13 4 -1.11910481e-13 4 21 0 21"
              />
              <polygon
                id="Line"
                fill="#EEE5B5"
                fillRule="nonzero"
                points="10 -1.11910481e-13 14 -1.11910481e-13 14 21 10 21"
              />
            </g>
          </symbol>
        </svg>
      </div>

      <section className="film-card film-card--full">
        <div className="film-card__header">
          <div className="film-card__bg">
            <img src={film?.backgroundImage} alt={film?.name} />
          </div>

          <h1 className="visually-hidden">WTW</h1>

          <header className="page-header">
            <div className="logo">
              <Link to={AppRoute.Main} className="logo__link">
                <span className="logo__letter logo__letter--1">W</span>
                <span className="logo__letter logo__letter--2">T</span>
                <span className="logo__letter logo__letter--3">W</span>
              </Link>
            </div>

            <nav className="breadcrumbs">
              <ul className="breadcrumbs__list">
                <li className="breadcrumbs__item">
                  <Link
                    to={`${APIRoute.Films}/${id}`}
                    className="breadcrumbs__link"
                  >
                    {film?.name}
                  </Link>
                </li>
                <li className="breadcrumbs__item">
                  <span className="breadcrumbs__link">Add review</span>
                </li>
              </ul>
            </nav>

            <ul className="user-block">
              <AuthInfoBlock />
            </ul>
          </header>

          <div className="film-card__poster film-card__poster--small">
            <img
              src={film?.posterImage}
              alt={film?.name}
              width="218"
              height="327"
            />
          </div>
        </div>

        <div className="add-review">
          <form action="#" className="add-review__form">
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
            {film && <FormReview rating={countStars} id={film?.id} />}
          </form>
        </div>
      </section>
    </>
  );
};

export default AddReview;
