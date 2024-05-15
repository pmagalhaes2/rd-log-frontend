import React, { useState } from "react";
import styles from "./Login.module.scss";
import logoImage from "../../assets/images/rdlog.png";
import loginImage from "../../assets/images/img-login.png";
import { Input } from "../../Components/Input";
import { Button } from "../../Components/Button";
import { Message } from "../../Components/Message";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../../context/UserContext";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const { login } = useUser();
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    if (!email || !password || !role) {
      setError("Por favor, preencha todos os campos.");
      return;
    }

    login(role, "Fulano");
    navigate("/support");
  };

  return (
    <div className={styles["login-box"]}>
      <div className={styles["login-content"]}>
        <div className={styles["login-image"]}>
          <img src={loginImage} alt="Imagem de login" />
        </div>
        <div className={styles["login-form"]}>
          <img
            className={styles["login-logo"]}
            src={logoImage}
            alt="Login Logo"
          />
          <Input
            placeholder={"Digite seu e-mail"}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            label={"E-mail"}
          />

          <Input
            type={"password"}
            placeholder={"Digite sua senha"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            label={"Senha"}
          />

          <label>Perfil</label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className={styles["role-select"]}
          >
            <option value="">Selecione o perfil</option>
            <option value="admin">Administrador</option>
            <option value="user">Usuário</option>
          </select>
          {error && <Message message={error} isError={true} />}
          <Button title="Login" freeSize={true} onClick={handleLogin} />

          <p className={styles["register-link"]}>
            Ainda não tem conta?
            <Link to="/register">Cadastre-se.</Link>
          </p>
        </div>
      </div>
    </div>
  );
};
