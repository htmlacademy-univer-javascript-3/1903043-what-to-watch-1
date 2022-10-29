import React from "react";
import Main from "../../pages/Main/Main";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NotFound from "../../pages/NotFound/NotFound";
import SignIn from "./../../pages/SignIn/SignIn";
import MyList from "./../../pages/MyList/MyList";
import Film from "./../../pages/Film/Film";
import AddReview from "./../../pages/AddReview/AddReview";
import Player from "./../../pages/Player/Player";
import { AppRoute } from "../../const";
import PrivateRoute from "./../../private-route/PrivateRoute";
import { useSelector } from "react-redux";
import { filmType } from "../../types/filmType";
import { fetchFilms } from "./../../store/api-actions";
import store from "../../store";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../types/store";

function App(): JSX.Element {
  type typeState = {
    baseFilms: filmType[];
    isLoading: boolean;
  };
  const [isAuth, setIsAuth] = React.useState(true);
  const { baseFilms: filmsList, isLoading }: typeState = useSelector(
    (state: any) => state.films
  );

  const dispatch = useDispatch<AppDispatch>();

  React.useEffect(() => {
    dispatch(fetchFilms());
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main lengthMyList={filmsList.length} />} />
        <Route path={AppRoute.Login} element={<SignIn />} />
        <Route
          path={AppRoute.MyList}
          element={
            <PrivateRoute isAuth={isAuth}>
              <MyList myList={filmsList} isLoading={isLoading} />
            </PrivateRoute>
          }
        />
        <Route path={AppRoute.Film}>
          <Route index element={<Film />} />
          <Route path={AppRoute.AddReview} element={<AddReview />} />
        </Route>
        <Route
          path={AppRoute.PlayerId}
          element={<Player videoUrl={filmsList[0]?.videoLink} />}
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
