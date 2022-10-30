import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosInstance } from "axios";
import { APIRoute } from "../const";
import { filmType } from "../types/filmType";

export const fetchFilms = createAsyncThunk<
  filmType,
  undefined,
  {
    extra: AxiosInstance;
  }
>("films/fetchFilms", async function (_arg, { extra: api }) {
  const { data } = await api.get<filmType>(APIRoute.Films);
  return data;
});
