import React from "react";
import { useNavigate } from "react-router-dom";
import { AppRoute, AuthorizationStatus } from "../../const";
import { loginAction } from "./../../store/api-actions";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../types/store";
import { useSelector } from "react-redux";
import { getAuthorizationStatus } from "./../../store/selectors";
import CustomLink from "../../custom-link/CustomLink";

const SignIn = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const dispatch = useDispatch<AppDispatch>();
  const authorizationStatus = useSelector((state) =>
    getAuthorizationStatus(state)
  );
  const navigate = useNavigate();

  const handleSignIn = (e: any) => {
    e.preventDefault();
    if (!isCorrectPassword()) {
      alert("Пароль должен состоять хотя-бы из одной буквы и цифры");
      return;
    }
    dispatch(loginAction({ email, password }));
    navigate(AppRoute.Main);
    setEmail("");
    setPassword("");
  };

  const isCorrectPassword = (): boolean => {
    let isHaveOneDigit = false;
    let isHaveOneLetter = false;
    for (const symbol of password) {
      if (symbol >= "0" && symbol <= "9") isHaveOneDigit = true;
      if (symbol.toLowerCase() != symbol.toUpperCase()) isHaveOneLetter = true;
    }
    return isHaveOneDigit && isHaveOneLetter;
  };

  if (authorizationStatus == AuthorizationStatus.Auth) {
    navigate(-1);
    return <></>;
  }

  return (
    <>
      <div className="user-page">
        <header className="page-header user-page__head">
          <div className="logo">
            <CustomLink to={AppRoute.Main} className="logo__link">
              <span className="logo__letter logo__letter--1">W</span>
              <span className="logo__letter logo__letter--2">T</span>
              <span className="logo__letter logo__letter--3">W</span>
            </CustomLink>
          </div>

          <h1 className="page-title user-page__title">Sign in</h1>
        </header>

        <div className="sign-in user-page__content">
          <form onSubmit={handleSignIn} className="sign-in__form">
            <div className="sign-in__fields">
              <div className="sign-in__field">
                <input
                  className="sign-in__input"
                  type="email"
                  placeholder="Email address"
                  value={email}
                  name="user-email"
                  id="user-email"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <label
                  className="sign-in__label visually-hidden"
                  htmlFor="user-email"
                >
                  Email address
                </label>
              </div>
              <div className="sign-in__field">
                <input
                  className="sign-in__input"
                  type="password"
                  placeholder="Password"
                  value={password}
                  name="user-password"
                  id="user-password"
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <label
                  className="sign-in__label visually-hidden"
                  htmlFor="user-password"
                >
                  Password
                </label>
              </div>
            </div>
            <div className="sign-in__submit">
              <button className="sign-in__btn" type="submit">
                Sign in
              </button>
            </div>
          </form>
        </div>

        <footer className="page-footer">
          <div className="logo">
            <a href="main.html" className="logo__link logo__link--light">
              <span className="logo__letter logo__letter--1">W</span>
              <span className="logo__letter logo__letter--2">T</span>
              <span className="logo__letter logo__letter--3">W</span>
            </a>
          </div>

          <div className="copyright">
            <p>© 2019 What to watch Ltd.</p>
          </div>
        </footer>
      </div>
    </>
  );
};

export default SignIn;
