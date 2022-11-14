import { configureStore } from "@reduxjs/toolkit";
import {
  filmsReducer,
  myListReducer,
  selectedFilmReducer,
  statusesReducer,
} from "./slices";
import { createAPI } from "../services/api";

const api = createAPI();

export default configureStore({
  reducer: {
    films: filmsReducer,
    selectedFilm: selectedFilmReducer,
    myList: myListReducer,
    statuses: statusesReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api,
      },
    }),
});
