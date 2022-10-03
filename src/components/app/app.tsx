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
import privateRoute from "../../private-route/PrivateRoute";
import PrivateRoute from "./../../private-route/PrivateRoute";
import { isatty } from "tty";

const filmsList = [
  {
    id: 0,
    imgUrl: "img/fantastic-beasts-the-crimes-of-grindelwald.jpg",
    title: "Fantastic Beasts: The Crimes of Grindelwald",
  },
  {
    id: 1,
    imgUrl: "img/bohemian-rhapsody.jpg",
    title: "Bohemian Rhapsody",
  },
  {
    id: 2,
    imgUrl: "img/macbeth.jpg",
    title: "Macbeth",
  },
  {
    id: 3,
    imgUrl: "img/aviator.jpg",
    title: "Aviator",
  },
];

function App(): JSX.Element {
  const [isAuth, setIsAuth] = React.useState(false);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main filmsList={filmsList} />} />
        <Route path={AppRoute.Login} element={<SignIn />} />
        <Route
          path={AppRoute.MyList}
          element={
            <PrivateRoute isAuth={isAuth}>
              <MyList />
            </PrivateRoute>
          }
        />
        <Route path={AppRoute.Film}>
          <Route index element={<Film />} />
          <Route path={AppRoute.AddReview} element={<AddReview />} />
        </Route>
        <Route path={AppRoute.PlayerId} element={<Player />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
