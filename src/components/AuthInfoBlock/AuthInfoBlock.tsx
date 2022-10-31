import React from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { AppRoute, AuthorizationStatus } from "../../const";
import { signOut } from "../../store/filmsSlice";
import { AppDispatch } from "../../types/store";
import { Link } from "react-router-dom";

export const AuthInfoBlock = () => {
  const authorizationStatus: AuthorizationStatus = useSelector(
    (state: any) => state.films.authorizationStatus
  );
  const dispatch = useDispatch<AppDispatch>();

  const handleSignOut = () => {
    dispatch(signOut());
  };

  return (
    <>
      <li className="user-block__item">
        <Link to={AppRoute.MyList}>
          <div className="user-block__avatar">
            <img
              src="img/avatar.jpg"
              alt="User avatar"
              width="63"
              height="63"
            />
          </div>
        </Link>
      </li>
      <li className="user-block__item">
        {authorizationStatus == AuthorizationStatus.Auth ? (
          <span className="user-block__link" onClick={handleSignOut}>
            Sign out
          </span>
        ) : (
          <Link to={AppRoute.Login} className="user-block__link">
            Sign in
          </Link>
        )}
      </li>
    </>
  );
};

export default AuthInfoBlock;
