export enum AppRoute {
  Main = "/",
  Login = "/login",
  MyList = "/mylist",
  Film = "/films/:id",
  AddReview = "review",
  PlayerId = "/player/:id",
  NotFound = "*",
}

export enum FilmTabName {
  Overview = "Overview",
  Details = "Details",
  Reviews = "Reviews",
}

export enum FilmGenres {
  All = "All Genres",
  Comedy = "Comedy",
  Crime = "Crime",
  Adventure = "Adventure",
  Fantasy = "Fantasy",
  Drama = "Drama",
  Action = "Action",
  Thriller = "Thriller",
}

export enum APIRoute {
  Films = "/films",
  Similar = "/similar",
  Favorite = "/favorite",
  Comments = "/comments",
  NotFound = "/page-404",
}

export enum AuthorizationStatus {
  Unknown = "Unknown",
  NoAuth = "NoAuth",
  Auth = "Auth",
}

export enum LoadingStatus {
  True = "true",
  False = "false",
  Error = "error",
}

export enum WhereFilmsList {
  OnMainPage = "ON_MAIN_PAGE",
  SimilarFilms = "SIMILAR_FILMS",
}

export enum NameAssesment {
  Bad = "Bad",
  Normal = "Normal",
  Good = "Good",
  VeryGood = "Very good",
  Awesome = "Awesome",
}
