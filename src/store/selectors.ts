import { AuthorizationStatus, FilmGenres, LoadingStatus } from "../const";
import { filmType } from "../types/filmType";

export const getAllFilms = (state: any): filmType[] => state.films.baseFilms;

export const getFilmsByGenre = (state: any): filmType[] =>
  state.films.filteredFilms;

export const getGenre = (state: any): FilmGenres => state.films.genre;

export const getCountFilmsShown = (state: any): number =>
  state.films.countFilmsShown;

export const getSelectedFilm = (state: any): null | filmType =>
  state.selectedFilm.film;

export const getSimilarFilms = (state: any): filmType[] =>
  state.selectedFilm.similarFilms;

export const getAuthorizationStatus = (state: any): AuthorizationStatus =>
  state.statuses.authorizationStatus;

export const getIsLoadingStatus = (state: any): LoadingStatus =>
  state.statuses.isLoading;

export const getMyList = (state: any): filmType[] => state.myList.myList;
