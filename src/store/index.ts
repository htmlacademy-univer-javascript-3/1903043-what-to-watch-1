import { configureStore } from "@reduxjs/toolkit";
import {
  filmsReducer,
  myListReducer,
  promoFilmReducer,
  selectedFilmReducer,
  statusesReducer,
  userReducer,
} from "./slices";
import { createAPI } from "../services/api";

const api = createAPI();

export default configureStore({
  reducer: {
    films: filmsReducer,
    selectedFilm: selectedFilmReducer,
    myList: myListReducer,
    statuses: statusesReducer,
    promoFilm: promoFilmReducer,
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api,
      },
    }),
});
