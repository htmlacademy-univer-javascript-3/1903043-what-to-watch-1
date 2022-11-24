import React from "react";
import { Navigate } from "react-router-dom";
import { AppRoute, AuthorizationStatus } from "../const";
import { useSelector } from "react-redux";
import { getAuthorizationStatus } from "./../store/selectors";

type privateRouteProp = {
  children: JSX.Element;
};

const PrivateRoute = ({ children }: privateRouteProp) => {
  const authorizationStatus = useSelector((state) =>
    getAuthorizationStatus(state)
  );
  return authorizationStatus == AuthorizationStatus.Auth ? (
    children
  ) : authorizationStatus == AuthorizationStatus.NoAuth ? (
    <Navigate to={AppRoute.Login} />
  ) : (
    <></>
  );
};

export default PrivateRoute;
