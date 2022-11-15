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
              <MyList myList={[]} />
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
