import React from "react";
import { Link } from "react-router-dom";
import Input from "./Input";


function Register() {
  
  return (
    <main className="main">
      <section className="registration">
        <h1 className="registration__title">Регистрация</h1>
        <form className="registration__form" name="registration" action="#">
          
          <Input
            type="email"
            InputClass="registration__input"
            placeholder="Email"
            name="email"
            minlength="2"
            maxlength="40"
            // value=""
          />
          <Input
            type="password"
            InputClass="registration__input"
            placeholder="Пароль"
            name="password"
            minlength="2"
            maxlength="40"
            // value=""
          />
          <button
            className="registration__btn"
            name="registrationBtn"
            type="submit"
          >
            Зарегистрироваться
          </button>
        </form>
      </section>

      <Link className="registration__link" to="/sign-in">
        Уже зарегистрированы? Войти
      </Link>
    </main>
  );
}
export default Register;
