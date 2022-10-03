import React from "react";
import { Navigate } from "react-router-dom";
import { AppRoute } from "../const";

type privateRouteProp = {
  isAuth: boolean;
  children: JSX.Element;
};

const PrivateRoute = ({ isAuth, children }: privateRouteProp) => {
  return isAuth ? children : <Navigate to={AppRoute.Login} />;
};

export default PrivateRoute;
