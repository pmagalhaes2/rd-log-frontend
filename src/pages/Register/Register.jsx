import React, { useRef, useState } from "react";
import styles from "./Register.module.scss";
import { Message } from "../../Components/Message";
import { useNavigate } from "react-router-dom";
import { Button } from "../../Components/Button";
import { Input } from "../../Components/Input";
import welcomeImage from "../../assets/images/welcome.svg";

function Register() {
  const nameRef = useRef(null);
  const cnpjRef = useRef(null);
  const openingHoursRef = useRef(null);
  const closingHoursRef = useRef(null);
  const phoneNumberRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const acceptsDangerousLoadsRef = useRef(null);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const formatTime = (time) => {
    const [hours, minutes] = time.split(":");
    return `${hours}:${minutes}:00`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      name: nameRef.current.value,
      cnpj: cnpjRef.current.value,
      opening_hours: openingHoursRef.current.value,
      closing_hours: closingHoursRef.current.value,
      phone_number: phoneNumberRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
      accepts_dangerous_loads: acceptsDangerousLoadsRef.current.checked,
    };

    if (
      formData.name.trim() === "" ||
      formData.cnpj.trim() === "" ||
      formData.opening_hours.trim() === "" ||
      formData.closing_hours.trim() === "" ||
      formData.phone_number.trim() === "" ||
      formData.email.trim() === "" ||
      formData.password.trim() === ""
    ) {
      setMessage("Por favor, preencha todos os campos.");
      setError(true);
    } else {
      try {
        setIsLoading(true);
        const response = await fetch(
          "http://localhost:8080/logistic-companies",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              ...formData,
              opening_hours: formatTime(formData.opening_hours),
              closing_hours: formatTime(formData.closing_hours),
            }),
          }
        );
        if (response.ok) {
          setError(false);
          setMessage("Cadastro realizado com sucesso!");
          nameRef.current.value = "";
          cnpjRef.current.value = "";
          openingHoursRef.current.value = "";
          closingHoursRef.current.value = "";
          phoneNumberRef.current.value = "";
          emailRef.current.value = "";
          passwordRef.current.value = "";
          acceptsDangerousLoadsRef.current.checked = false;
          navigate("/login");
        } else {
          const errorData = await response.json();
          setMessage(`Erro: ${errorData.message}`);
          setError(true);
        }
      } catch (error) {
        console.error("Erro ao realizar cadastro:", error);
        setMessage("Erro ao enviar formulário. Por favor, tente novamente.");
        setError(true);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles["register-container"]}>
        <img src={welcomeImage} alt="Imagem de boas vindas" />
        {message && <Message message={message} isError={error} />}
        <form onSubmit={handleSubmit}>
          <h1>Cadastro de Empresa de Logística</h1>
          <Input
            name="name"
            placeholder={"ex: Transportes XYZ"}
            label={"Nome da empresa"}
            ref={nameRef}
          />
          <Input
            name="cnpj"
            placeholder={"ex: 12.345.678/0001-90"}
            label={"CNPJ"}
            ref={cnpjRef}
          />
          <div className={styles["form-row"]}>
            <Input
              type={"time"}
              name="opening_hours"
              label="Horário de Abertura"
              ref={openingHoursRef}
            />
            <Input
              type="time"
              name="closing_hours"
              label="Horário de Fechamento"
              ref={closingHoursRef}
            />
          </div>
          <div className={styles["form-row"]}>
            <Input
              name="phone_number"
              label={"Telefone"}
              placeholder="ex: (11) 98765-4321"
              ref={phoneNumberRef}
            />
            <Input
              type="email"
              name="email"
              label={"E-mail"}
              placeholder="ex: mail@empresa.com"
              ref={emailRef}
            />
          </div>
          <div className={styles["form-row"]}>
            <Input
              type="password"
              name="password"
              label={"Senha"}
              placeholder="ex: ********"
              ref={passwordRef}
            />
            <Input
              type="password"
              name="confirm_password"
              label={"Confirmação senha"}
              placeholder="ex: ********"
            />
          </div>
          <div className={styles["form-row"]}>
            <label>
              <input
                type="checkbox"
                name="accepts_dangerous_loads"
                ref={acceptsDangerousLoadsRef}
              />
              Aceita carga perigosa
            </label>
          </div>
          <Button
            type="submit"
            disabled={isLoading}
            title={isLoading ? "Enviando..." : "Confirmar cadastro"}
            freeSize
          />
        </form>
      </div>
    </div>
  );
}

export default Register;
