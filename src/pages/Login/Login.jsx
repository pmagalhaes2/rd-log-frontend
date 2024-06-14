import React, { useState } from "react";
import styles from "./Login.module.scss";
import logoImage from "../../assets/images/rdlog.png";
import loginImage from "../../assets/images/img-login.png";
import { Input } from "../../Components/Input";
import { Button } from "../../Components/Button";
import { Message } from "../../Components/Message";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../../context/UserContext";
import {
  getById,
  logisticCompanyLogin,
} from "../../services/logisticCompaniesAPI.js";
import {
  administratorLogin,
  getAdministratorById,
} from "../../services/administratorsAPI.js";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const { login } = useUser();
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email || !password || !role) {
      setError("Por favor, preencha todos os campos.");
      return;
    }

    if (role !== "user") {
      try {
        const data = await administratorLogin(email, password);

        if (data) {
          const { administratorId } = data;
          await getAdministrator(administratorId);
        } else {
          setError("Erro ao fazer login. Por favor, tente novamente.");
          handleClearInputs();
        }
      } catch (error) {
        setError("Erro ao fazer login. Por favor, tente novamente.");
        handleClearInputs();
      }
    } else {
      try {
        const data = await logisticCompanyLogin(email, password, role);

        if (data) {
          const { logisticCompanyId } = data;
          await getLogisticCompany(logisticCompanyId);
        } else {
          setError("Erro ao fazer login. Por favor, tente novamente.");
          handleClearInputs();
        }
      } catch (error) {
        setError("Erro ao fazer login. Por favor, tente novamente.");
        handleClearInputs();
      }
    }
  };

  const handleClearInputs = () => {
    setEmail("");
    setPassword("");
    setRole("");
  };

  const getLogisticCompany = async (id) => {
    try {
      const response = await getById(id);

      if (response) {
        login(role, response.name, response.id);
        navigate("/dashboard");
      } else {
        setError("Erro ao buscar dados. Tente novamente!");
      }
    } catch (error) {
      setError("Erro ao buscar dados. Tente novamente!");
    }
  };

  const getAdministrator = async (id) => {
    try {
      const response = await getAdministratorById(id);

      if (response) {
        login(role, response.name, response.id);
        navigate("/dashboard");
      } else {
        setError("Erro ao buscar dados. Tente novamente!");
      }
    } catch (error) {
      setError("Erro ao buscar dados. Tente novamente!");
    }
  };

  return (
    <div className={styles.container}>
    <div className={styles["login-box"]}>
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
              freeSize={false}
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
            <Button title="Login" freeSize onClick={handleLogin} />
            <p className={styles["register-link"]}>
              Ainda não tem conta?
              <Link to="/register">Cadastre-se.</Link>
            </p>
      </div>
    </div>
</div>
         

  );
};