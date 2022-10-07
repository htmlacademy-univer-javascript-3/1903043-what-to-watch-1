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
import { filmType } from "../../types/filmType";
import { myList } from "./../../mocks/myList";

type typeProps = {
  filmsList: filmType[];
};

function App({ filmsList }: typeProps): JSX.Element {
  const [isAuth, setIsAuth] = React.useState(true);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Main filmsList={filmsList} lengthMyList={myList.length} />}
        />
        <Route path={AppRoute.Login} element={<SignIn />} />
        <Route
          path={AppRoute.MyList}
          element={
            <PrivateRoute isAuth={isAuth}>
              <MyList myList={myList} />
            </PrivateRoute>
          }
        />
        <Route path={AppRoute.Film}>
          <Route index element={<Film />} />
          <Route
            path={AppRoute.AddReview}
            element={<AddReview film={filmsList[0]} />}
          />
        </Route>
        <Route
          path={AppRoute.PlayerId}
          element={<Player videoUrl={filmsList[0].videoUrl} />}
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
