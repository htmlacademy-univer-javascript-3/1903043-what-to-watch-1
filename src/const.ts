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
  Comedies = "Comedies",
  Crime = "Crime",
  Documentary = "Documentary",
  Dramas = "Dramas",
  KidsFamily = "Kids & Family",
  Romance = "Romance",
  SciFi = "Sci-Fi",
  Thrillers = "Thrillers",
}

export enum APIRoute {
  Films = "/films",
  ParticularFilm = "/film",
  Login = "/login",
}

export enum AuthorizationStatus {
  Unknown = "Unknown",
  NoAuth = "NoAuth",
  Auth = "Auth",
}
