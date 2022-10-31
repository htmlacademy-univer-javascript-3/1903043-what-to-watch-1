import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosInstance } from "axios";
import { APIRoute, AppRoute, AuthorizationStatus } from "../const";
import { Token } from "../services/token";
import { filmType } from "../types/filmType";
import { requireAuthorize } from "./filmsSlice";
import { saveToken } from "./../services/token";
import { AuthData } from "../types/auth-data";
import { userData } from "../types/user-data";

export const fetchFilms = createAsyncThunk<
  filmType[],
  undefined,
  {
    extra: AxiosInstance;
  }
>("films/fetchFilms", async function (_arg, { dispatch, extra: api }) {
  try {
    const { data } = await api.get<filmType[]>(APIRoute.Films);
    return data;
  } catch (error: any) {
    throw new Error(error.message);
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
