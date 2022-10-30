import { createSlice } from "@reduxjs/toolkit";
import { FilmGenres } from "../const";
import { filmType } from "../types/filmType";
import { fetchFilms } from "./api-actions";

const filmsSlice = createSlice({
  name: "films",
  initialState: {
    isLoading: true,
    baseFilms: [],
    filteredFilms: [],
    myList: [],
    genre: FilmGenres.All,
    activeFilm: null,
  },
  reducers: {
    setFilms(state, action) {
      state.baseFilms = action.payload;
      state.filteredFilms = action.payload;
    },
    setMyList(state, action) {
      state.myList = action.payload;
    },
    setActiveFilm(state, action) {
      state.activeFilm = action.payload;
    },
    setGenre(state, action) {
      state.genre = action.payload;
      if (action.payload === FilmGenres.All) {
        state.filteredFilms = state.baseFilms;
      } else {
        state.filteredFilms = state.baseFilms.filter(
          (film: filmType) => film.genre === action.payload.toLowerCase()
        );
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchFilms.pending, (state: any, action: any) => {
      state.isLoading = true;
    });
    builder.addCase(fetchFilms.fulfilled, (state: any, action: any) => {
      state.baseFilms = action.payload;
      state.filteredFilms = action.payload;
      state.isLoading = false;
    });
  },
});

export const { setGenre, setFilms } = filmsSlice.actions;

export default filmsSlice.reducer;
