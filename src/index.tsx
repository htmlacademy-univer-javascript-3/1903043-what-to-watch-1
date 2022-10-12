import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/app/app";
import { filmsList } from "./mocks/films";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(<App filmsList={filmsList} />);
