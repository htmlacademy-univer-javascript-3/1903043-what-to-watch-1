import React from "react";
import { Navigate } from "react-router-dom";
import { AppRoute, AuthorizationStatus } from "../const";
import { useSelector } from "react-redux";

type privateRouteProp = {
  children: JSX.Element;
};

const PrivateRoute = ({ children }: privateRouteProp) => {
  const authorizationStatus = useSelector(
    (state: any) => state.films.authorizationStatus
  );
  return authorizationStatus == AuthorizationStatus.Auth ? (
    children
  ) : (
    <Navigate to={AppRoute.Login} />
  );
};

export default PrivateRoute;
