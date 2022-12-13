import { createSlice } from "@reduxjs/toolkit";
import {
  AuthorizationStatus,
  NumberFilmsShown,
  FilmGenres,
  LoadingStatus,
} from "../const";
import { removeToken, saveToken } from "../services/token";
import { filmType } from "../types/film-type";

const userSlice = createSlice({
  name: "user",
  initialState: {
    avatarUrl: "",
    email: "",
    id: 0,
    name: "",
    token: "",
    authorizationStatus: AuthorizationStatus.Unknown,
  },
  reducers: {
    failedAuthorization(state) {
      state.authorizationStatus = AuthorizationStatus.NoAuth;
    },
    signOut(state) {
      state.authorizationStatus = AuthorizationStatus.NoAuth;
      state.avatarUrl = "";
      state.email = "";
      state.id = 0;
      state.name = "";
      state.token = "";
      removeToken();
    },
    setUser(state, action) {
      const { avatarUrl, email, id, name, token } = action.payload;
      state.avatarUrl = avatarUrl;
      state.email = email;
      state.id = id;
      state.name = name;
      state.token = token;
      state.authorizationStatus = AuthorizationStatus.Auth;
      saveToken(token);
    },
  },
});

const statusesSlice = createSlice({
  name: "statuses",
  initialState: {
    isLoading: LoadingStatus.True,
  },
  reducers: {
    setLoadingTrue(state) {
      if (checkIsLoadingError(state.isLoading)) return;
      state.isLoading = LoadingStatus.True;
    },
    setLoadingFalse(state) {
      if (checkIsLoadingError(state.isLoading)) return;
      state.isLoading = LoadingStatus.False;
    },
    setLoadingError(state) {
      state.isLoading = LoadingStatus.Error;
    },
  },
});

const checkIsLoadingError = (isLoading: LoadingStatus) =>
  isLoading === LoadingStatus.Error;

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
    deleteFilmFromMyList(state, action) {
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
    refreshFilmFavoriteStatus(state: any) {
      if (state.film) {
        state.film.isFavorite = false;
      }
    },
  },
});

const promoFilmSlice = createSlice({
  name: "promoFilm",
  initialState: {
    film: null,
  },
  reducers: {
    setPromoFilm(state, action) {
      state.film = action.payload;
    },
  },
});

const filmsSlice = createSlice({
  name: "films",
  initialState: {
    baseFilms: [],
    filteredFilms: [],
    countFilmsShown: NumberFilmsShown,
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
      state.countFilmsShown += NumberFilmsShown;
    },
    resetNumberFilmsShown(state) {
      state.countFilmsShown = NumberFilmsShown;
    },
  },
});

export const { setLoadingTrue, setLoadingFalse, setLoadingError } =
  statusesSlice.actions;
export const { setMyList, addFilmToMyList, deleteFilmFromMyList } =
  myListSlice.actions;
export const { setFilm, refreshFilmFavoriteStatus, setSimilarFilms } =
  selectedFilmSlice.actions;
export const {
  setGenre,
  setFilms,
  changeFilmValues,
  showMoreFilms,
  resetNumberFilmsShown,
} = filmsSlice.actions;
export const { setPromoFilm } = promoFilmSlice.actions;
export const { signOut, failedAuthorization, setUser } = userSlice.actions;

export const statusesReducer = statusesSlice.reducer;
export const myListReducer = myListSlice.reducer;
export const selectedFilmReducer = selectedFilmSlice.reducer;
export const filmsReducer = filmsSlice.reducer;
export const promoFilmReducer = promoFilmSlice.reducer;
export const userReducer = userSlice.reducer;
