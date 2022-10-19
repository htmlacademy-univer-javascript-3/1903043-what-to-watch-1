import { createSlice } from "@reduxjs/toolkit";
import { FilmGenres } from "../const";
import { filmsList } from "./../mocks/films";

const filmsSlice = createSlice({
  name: "films",
  initialState: {
    baseFilms: filmsList,
    filteredFilms: filmsList,
    genre: FilmGenres.All,
  },
  reducers: {
    setGenre(state, action) {
      state.genre = action.payload;
      if (action.payload === FilmGenres.All) {
        state.filteredFilms = state.baseFilms;
      } else {
        state.filteredFilms = state.baseFilms.filter(
          (film) => film.genre === action.payload.toLowerCase()
        );
      }
    },
  },
});

export const { setGenre } = filmsSlice.actions;

export default filmsSlice.reducer;
