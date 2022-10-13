import React from "react";
import { FilmTabName } from "../../const";
import FilmTabDetails from "./FilmTabDetails";
import FilmTabOverview from "./FilmTabOverview";
import FilmTabReviews from "./FilmTabReviews";

type propsType = {
  description: string;
  rating: number;
  activeTab: FilmTabName;
};

const FilmTab = ({ activeTab, description, rating }: propsType) => {
  if (activeTab == FilmTabName.Overview)
    return <FilmTabOverview description={description} rating={rating} />;

  if (activeTab == FilmTabName.Details) return <FilmTabDetails />;

  return <FilmTabReviews />;
};

export default FilmTab;
