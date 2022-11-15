import { createSlice } from "@reduxjs/toolkit";
import { AuthorizationStatus, FilmGenres, LoadingStatus } from "../const";
import { removeToken } from "../services/token";
import { filmType } from "../types/filmType";

const statusesSlice = createSlice({
  name: "statuses",
  initialState: {
    isLoading: LoadingStatus.True,
    authorizationStatus: AuthorizationStatus.Unknown,
  },
  reducers: {
    setLoadingTrue(state) {
      state.isLoading = LoadingStatus.True;
    },
    setLoadingFalse(state) {
      state.isLoading = LoadingStatus.False;
    },
    setLoadingError(state) {
      state.isLoading = LoadingStatus.Error;
    },
    requireAuthorize(state, action) {
      state.authorizationStatus = action.payload;
    },
    signOut(state) {
      state.authorizationStatus = AuthorizationStatus.NoAuth;
      removeToken();
    },
  },
});

const myListSlice = createSlice({
  name: "myList",
  initialState: {
    myList: [],
  },
  reducers: {
    setMyList(state, action) {
      state.myList = action.payload;
    },
    addFilmToMyList(state: any, action) {
      state.myList = [...state.myList, action.payload];
    },
    deleteFilmFromMyList(state: any, action) {
      state.myList = state.myList.filter(
        (film: filmType) => film.id !== action.payload.id
      );
    },
  },
});

const selectedFilmSlice = createSlice({
  name: "selectedFilm",
  initialState: {
    film: null,
    similarFilms: [],
  },
  reducers: {
    setFilm(state, action) {
      state.film = action.payload;
    },
    setSimilarFilms(state, action) {
      state.similarFilms = action.payload;
    },
  },
});

const filmsSlice = createSlice({
  name: "films",
  initialState: {
    baseFilms: [],
    filteredFilms: [],
    countFilmsShown: 8,
    genre: FilmGenres.All,
  },
  reducers: {
    setFilms(state, action) {
      state.baseFilms = action.payload;
      state.filteredFilms = action.payload;
    },
    changeFilmValues(state: any, action) {
      state.baseFilms = state.baseFilms.map((film: filmType) =>
        film.id === action.payload.id ? action.payload : film
      );
      state.filteredFilms = state.filteredFilms.map((film: filmType) =>
        film.id === action.payload.id ? action.payload : film
      );
    },
    setGenre(state, action) {
      state.genre = action.payload;

      if (action.payload === FilmGenres.All) {
        state.filteredFilms = state.baseFilms;
      } else {
        state.filteredFilms = state.baseFilms.filter(
          (film: filmType) =>
            film.genre.toLowerCase() === action.payload.toLowerCase()
        );
      }
    },
    showMoreFilms(state) {
      state.countFilmsShown += 8;
    },
  },
});

export const {
  requireAuthorize,
  signOut,
  setLoadingTrue,
  setLoadingFalse,
  setLoadingError,
} = statusesSlice.actions;
export const { setMyList, addFilmToMyList, deleteFilmFromMyList } =
  myListSlice.actions;
export const { setFilm, setSimilarFilms } = selectedFilmSlice.actions;
export const { setGenre, setFilms, changeFilmValues, showMoreFilms } =
  filmsSlice.actions;

export const statusesReducer = statusesSlice.reducer;
export const myListReducer = myListSlice.reducer;
export const selectedFilmReducer = selectedFilmSlice.reducer;
export const filmsReducer = filmsSlice.reducer;
