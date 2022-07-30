import React from "react";
import logo from "../images/svg/logo.svg";
import logo320 from "../images/svg/logo320.svg";
import { Link } from "react-router-dom";

function Header({registerPage}) {
  let sigin = ""   
    if (registerPage === "sign-up") {
         sigin = true;
    } else if (registerPage === "sigin-in") {
        sigin = false;
    }
  return (
    <header className="header page__header">
      <picture>
        <source media="(min-width: 1280px)" srcSet={logo} />
        <source media="(max-width: 320px)" srcSet={logo320} />
        <img className="header__logo" src={logo} alt="Место" />
      </picture>
      <Link to={sigin ? "/sign-in": "/sign-up"} className="registration__link-header">{sigin ? "Войти": "Регистрация"}</Link>
    </header>
  );
}
export default Header;
