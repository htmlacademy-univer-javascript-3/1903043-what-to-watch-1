import React from "react";
import Main from "../../pages/main/main";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NotFound from "../../pages/not-found/not-found";
import SignIn from "../../pages/sign-in/sign-in";
import MyList from "../../pages/my-list/my-list";
import Film from "../../pages/film/film";
import AddReview from "../../pages/add-review/add-review";
import Player from "../../pages/player/player";
import { AppRoute } from "../../const";
import PrivateRoute from "../private-route/private-route";
import { checkAuthStatus, fetchMyList } from "./../../store/api-actions";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../types/store";

function App(): JSX.Element {
  const dispatch = useDispatch<AppDispatch>();

  React.useEffect(() => {
    dispatch(checkAuthStatus());
    dispatch(fetchMyList());
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path={AppRoute.Login} element={<SignIn />} />
        <Route
          path={AppRoute.MyList}
          element={
            <PrivateRoute>
              <MyList />
            </PrivateRoute>
          }
        />
        <Route path={AppRoute.Film}>
          <Route index element={<Film />} />
          <Route
            path={AppRoute.AddReview}
            element={
              <PrivateRoute>
                <AddReview />
              </PrivateRoute>
            }
          />
        </Route>
        <Route path={AppRoute.PlayerId} element={<Player />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
