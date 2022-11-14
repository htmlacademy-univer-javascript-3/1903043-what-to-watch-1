import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosInstance } from "axios";
import { APIRoute, AppRoute, AuthorizationStatus } from "../const";
import { Token } from "../services/token";
import { filmType } from "../types/filmType";
import {
  requireAuthorize,
  setFilm,
  setFilms,
  setLoadingError,
  setLoadingFalse,
  setLoadingTrue,
  setMyList,
  setSimilarFilms,
} from "./slices";
import { saveToken } from "./../services/token";
import { AuthData } from "../types/auth-data";

export const fetchFilms = createAsyncThunk<
  void,
  undefined,
  {
    extra: AxiosInstance;
  }
>("films/fetchFilms", async function (_arg, { dispatch, extra: api }) {
  try {
    dispatch(setLoadingTrue());
    const { data } = await api.get<filmType[]>(APIRoute.Films);
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
    dispatch(setLoadingTrue());
    const { data: filmData } = await api.get<filmType>(
      `${APIRoute.Films}/${id}`
    );
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
>("films/checkAuthStatus", async function (_arg, { dispatch, extra: api }) {
  try {
    await api.get<Token>(AppRoute.Login);
    dispatch(requireAuthorize(AuthorizationStatus.Auth));
  } catch (error) {
    dispatch(requireAuthorize(AuthorizationStatus.NoAuth));
  }
});

export const fetchMyList = createAsyncThunk<
  void,
  undefined,
  {
    extra: AxiosInstance;
  }
>("films/fetchFilms", async function (_arg, { dispatch, extra: api }) {
  try {
    dispatch(setLoadingTrue());
    const { data } = await api.get<filmType[]>(APIRoute.Favorite);
    dispatch(setMyList(data));
    dispatch(setLoadingFalse());
  } catch (error: any) {
    dispatch(setLoadingError());
  }
});

export const loginAction = createAsyncThunk<
  void,
  AuthData,
  {
    extra: AxiosInstance;
  }
>(
  "films/loginAction",
  async function ({ email, password }, { dispatch, extra: api }: any) {
    try {
      const {
        data: { token },
      } = await api.post(AppRoute.Login, { email, password });
      saveToken(token);
      dispatch(requireAuthorize(AuthorizationStatus.Auth));
    } catch (error) {
      dispatch(requireAuthorize(AuthorizationStatus.NoAuth));
    }
  }
);
