import React, { useState } from "react";
import { Error } from "../../Components/Error";
import styles from "./Register.module.scss";

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    cnpj: "",
    opening_hours: "",
    closing_hours: "",
    phone_number: "",
    email: "",
    password: "",
    confirm_password: "",
    accepts_dangerous_loads: false,
  });
  const [submitMessage, setSubmitMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setFormData({
      ...formData,
      [e.target.name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      formData.name.trim() === "" ||
      formData.cnpj.trim() === "" ||
      formData.opening_hours.trim() === "" ||
      formData.closing_hours.trim() === "" ||
      formData.phone_number.trim() === "" ||
      formData.email.trim() === "" ||
      formData.password.trim() === "" ||
      formData.confirm_password.trim() === ""
    ) {
      setSubmitMessage("Por favor, preencha todos os campos.");
    } else if (formData.password !== formData.confirm_password) {
      setSubmitMessage("As senhas não coincidem.");
    } else if (formData.password.length < 8) {
      setSubmitMessage("A senha deve ter no mínimo 8 caracteres.");
    } else {
      setIsLoading(true);
      try {
        const response = await fetch("http://localhost:8080/logistic-companies", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
        if (response.ok) {
          setSubmitMessage("Cadastro realizado com sucesso!");
        } else {
          const errorData = await response.json();
          setSubmitMessage(`Erro: ${errorData.message}`);
        }
      } catch (error) {
        console.error("Erro ao enviar cadastro:", error);
        setSubmitMessage("Erro ao enviar cadastro. Por favor, tente novamente.");
      } finally {
        setIsLoading(false);
      }
      setError("Por favor, preencha todos os campos.");
    }
  };
  

  return (
    <div className={styles["register-container"]}>
      <h2>Cadastre-se</h2>
      {submitMessage && <p className={styles["submit-message"]}>{submitMessage}</p>}
      {submitMessage && (
        <p className={styles["submit-message"]}>{submitMessage}</p>
      )}
      {error && <Error message={error} />}
      <form onSubmit={handleSubmit}>
        <div
          className={`${styles["form-row-full"]} ${
            !formData.name && styles["required"]
          }`}
        >
          <input
            type="text"
            name="name"
            placeholder="Nome"
            value={formData.name}
            onChange={handleChange}
          />
          <input
            type="text"
            name="cnpj"
            placeholder="CNPJ"
            value={formData.cnpj}
            onChange={handleChange}
          />
        </div>
        <div className={styles["form-row"]}>
          <input
            type="time"
            name="opening_hours"
            placeholder="Horário de Abertura"
            value={formData.opening_hours}
            onChange={handleChange}
          />
          <input
            type="time"
            name="closing_hours"
            placeholder="Horário de Fechamento"
            value={formData.closing_hours}
            onChange={handleChange}
          />
        </div>
        <div className={styles["form-row"]}>
          <input
            type="text"
            name="phone_number"
            placeholder="Telefone"
            value={formData.phone_number}
            onChange={handleChange}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div className={styles["form-row"]}>
          <input
            type="password"
            name="password"
            placeholder="Senha"
            value={formData.password}
            onChange={handleChange}
          />
          <input
            type="password"
            name="confirm_password"
            placeholder="Confirmar senha"
            value={formData.confirm_password}
            onChange={handleChange}
          />
        </div>
        <div className={styles["form-row"]}>
          <label>
            <input
              type="checkbox"
              name="accepts_dangerous_loads"
              checked={formData.accepts_dangerous_loads}
              onChange={handleChange}
            />
            Aceita carga perigosa
          </label>
        </div>
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Enviando..." : "Confirmar cadastro"}
        </button>
      </form>
    </div>
  );
}

export default Register;
