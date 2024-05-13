import React from 'react';
import styles from "./Login.module.scss";
import Footer from '../../Components/Footer/Footer';
import Header from '../../Components/Header/Header';
import logoImage from "../../assets/images/rdlog.png";
import loginImage from "../../assets/images/img-login.png"

export const Login = () => {
  return (
    <div>
      <Header />
      <div className={styles["login-box"]}>
            <div className={styles["login-content"]}>
              <div className={styles["login-image"]}>
              <img src={loginImage} alt="Login Image" /> 
              </div>
              <div className={styles["login-form"]}>
              <img className={styles["login-logo"]} src={logoImage} alt="Login Logo" />
                <p className={styles["text"]}>E-mail</p>
                <input type="text" placeholder="Digite seu e-mail" />

                <p className={styles["text"]}>Senha</p>
                <input type="password" placeholder="Digite sua senha" />
                <button>Login</button>

                <p className={styles["register-link"]}>Ainda não tem conta?
                <a href="#"> Cadastre-se</a></p>
              </div>
            </div>
          </div>
          <Footer />
        </div>
   
  );
}

