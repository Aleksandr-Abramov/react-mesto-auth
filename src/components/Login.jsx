import React from "react";
import Input from "./Input";


function Login() {
  
  return (
    <main className="main">
      <section className="registration">
        <h1 className="registration__title">Вход</h1>
        <form className="registration__form" name="login" action="#">

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
            Войти
          </button>
        </form>
      </section>
    </main>
  );
}
export default Login;
