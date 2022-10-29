import { configureStore } from "@reduxjs/toolkit";
import filmsSlice from "./filmsSlice";
import { createAPI } from "../services/api";

const api = createAPI();

export default configureStore({
  reducer: {
    films: filmsSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api,
      },
    }),
});
