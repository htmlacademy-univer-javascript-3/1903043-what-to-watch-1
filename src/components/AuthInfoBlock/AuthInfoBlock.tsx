import React from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { AppRoute, AuthorizationStatus } from "../../const";
import { AppDispatch } from "../../types/store";
import { getAuthorizationStatus, getUserData } from "./../../store/selectors";
import CustomLink from "../../custom-link/CustomLink";
import { signOutAction } from "../../store/api-actions";

export const AuthInfoBlock = () => {
  const authorizationStatus = useSelector((state) =>
    getAuthorizationStatus(state)
  );
  const { avatarUrl } = useSelector((state) => getUserData(state));
  const dispatch = useDispatch<AppDispatch>();

  const handleSignOut = () => {
    dispatch(signOutAction());
  };

  return (
    <>
      <li className="user-block__item">
        <CustomLink to={AppRoute.MyList}>
          <div className="user-block__avatar">
            <img
              src={`${avatarUrl || "img/avatar.jpg"}`}
              alt="User avatar"
              width="63"
              height="63"
            />
          </div>
        </CustomLink>
      </li>
      <li className="user-block__item">
        {authorizationStatus == AuthorizationStatus.Auth ? (
          <span className="user-block__link" onClick={handleSignOut}>
            Sign out
          </span>
        ) : (
          <CustomLink to={AppRoute.Login} className="user-block__link">
            Sign in
          </CustomLink>
        )}
      </li>
    </>
  );
};

export default AuthInfoBlock;
