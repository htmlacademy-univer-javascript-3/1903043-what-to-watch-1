import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosInstance } from "axios";
import { APIRoute, AppRoute, AuthorizationStatus } from "../const";
import { Token } from "../services/token";
import { filmType } from "../types/film-type";
import {
  addFilmToMyList,
  changeFilmValues,
  deleteFilmFromMyList,
  failedAuthorization,
  refreshFilmFavoriteStatus,
  setFilm,
  setFilms,
  setLoadingError,
  setLoadingFalse,
  setLoadingTrue,
  setMyList,
  setPromoFilm,
  setSimilarFilms,
  setUser,
  signOut,
} from "./slices";
import { AuthData } from "../types/auth-data";

export const fetchPromoFilm = createAsyncThunk<
  void,
  undefined,
  {
    extra: AxiosInstance;
  }
>("promoFilms/fetchPromoFilm", async function (_arg, { dispatch, extra: api }) {
  try {
    const { data } = await api.get<filmType>(APIRoute.PromoFilm);
    dispatch(setPromoFilm(data));
  } catch (error: any) {
    dispatch(setLoadingError());
  }
});

export const fetchFilms = createAsyncThunk<
  void,
  undefined,
  {
    extra: AxiosInstance;
  }
>("films/fetchFilms", async function (_arg, { dispatch, extra: api }) {
  try {
    const { data } = await api.get<filmType[]>(APIRoute.Films);
    dispatch(setLoadingTrue());
    dispatch(setFilms(data));
    dispatch(setLoadingFalse());
  } catch (error: any) {
    dispatch(setLoadingError());
  }
});

export const fetchSelectedFilm = createAsyncThunk<
  void,
  { id: number },
  {
    extra: AxiosInstance;
  }
>("films/fetchSelectedFilm", async function ({ id }, { dispatch, extra: api }) {
  try {
    const { data: filmData } = await api.get<filmType>(
      `${APIRoute.Films}/${id}`
    );
    dispatch(setLoadingTrue());
    dispatch(setFilm(filmData));

    const { data: similarFilmsData } = await api.get<filmType[]>(
      `${APIRoute.Films}/${id}${APIRoute.Similar}`
    );
    dispatch(
      setSimilarFilms(
        similarFilmsData
          .filter((similarFilm) => similarFilm.id != filmData.id)
          .slice(0, 4)
      )
    );
    dispatch(setLoadingFalse());
  } catch (error: any) {
    dispatch(setLoadingError());
  }
});

export const checkAuthStatus = createAsyncThunk<
  void,
  undefined,
  {
    extra: AxiosInstance;
  }
>("user/checkAuthStatus", async function (_arg, { dispatch, extra: api }) {
  try {
    const { data } = await api.get<Token>(AppRoute.Login);
    await dispatch(setUser(data));
    dispatch(fetchMyList());
  } catch (error) {
    dispatch(failedAuthorization());
  }
});

export const fetchMyList = createAsyncThunk<
  void,
  undefined,
  {
    extra: AxiosInstance;
  }
>("myList/fetchMyList", async function (_arg, { dispatch, extra: api }) {
  try {
    const { data } = await api.get<filmType[]>(APIRoute.Favorite);
    dispatch(setLoadingTrue());
    dispatch(setMyList(data));
    dispatch(setLoadingFalse());
  } catch (error: any) {
    dispatch(setMyList([]));
    console.log(error.message);
  }
});

export const addFilmToFavorite = createAsyncThunk<
  void,
  { id: number },
  {
    extra: AxiosInstance;
  }
>("films/addFilmToFavorite", async function ({ id }, { dispatch, extra: api }) {
  try {
    const { data } = await api.post<filmType>(`${APIRoute.Favorite}/${id}/1`);
    dispatch(setFilm(data));
    dispatch(changeFilmValues(data));
    dispatch(addFilmToMyList(data));
  } catch (error: any) {
    console.log(error.message);
  }
});

export const deleteFilmFromFavorite = createAsyncThunk<
  void,
  { id: number },
  {
    extra: AxiosInstance;
  }
>(
  "films/deleteFilmFromFavorite",
  async function ({ id }, { dispatch, extra: api }) {
    try {
      const { data } = await api.post<filmType>(`${APIRoute.Favorite}/${id}/0`);
      dispatch(setFilm(data));
      dispatch(changeFilmValues(data));
      dispatch(deleteFilmFromMyList(data));
    } catch (error: any) {
      console.log(error.message);
    }
  }
);

export const loginAction = createAsyncThunk<
  void,
  AuthData,
  {
    extra: AxiosInstance;
  }
>(
  "user/loginAction",
  async function ({ email, password }, { dispatch, extra: api }: any) {
    try {
      const { data } = await api.post(AppRoute.Login, { email, password });
      await dispatch(setUser(data));
      dispatch(fetchMyList());
    } catch (error) {
      dispatch(failedAuthorization());
    }
  }
);

export const refreshFilmsFavoriteStatuses = createAsyncThunk<
  void,
  undefined,
  {
    extra: AxiosInstance;
  }
>("user/loginAction", async function (_arg, { dispatch, extra: api }: any) {
  try {
    dispatch(fetchMyList());
    dispatch(fetchPromoFilm());
    dispatch(refreshFilmFavoriteStatus());
  } catch (error: any) {
    console.log(error.message);
  }
});

export const signOutAction = createAsyncThunk<
  void,
  undefined,
  {
    extra: AxiosInstance;
  }
>("user/signOutAction", async function (_arg, { dispatch, extra: api }: any) {
  try {
    await api.delete(APIRoute.LogOut);
    dispatch(signOut());
    dispatch(refreshFilmsFavoriteStatuses());
  } catch (error) {
    dispatch(failedAuthorization());
  }
});
