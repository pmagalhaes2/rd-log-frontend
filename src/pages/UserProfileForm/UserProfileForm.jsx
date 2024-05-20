import React, { useEffect, useRef, useState } from "react";
import { Message } from "../../Components/Message";
import { useNavigate } from "react-router-dom";
import { Button } from "../../Components/Button";
import { Input } from "../../Components/Input";
import MenuComponent from "../../Components/Menu/Menu";
import styles from "./UserProfileForm.module.scss";
import { useUser } from "../../context/UserContext";

function UserProfileForm() {
  const { user } = useUser();

  const nameRef = useRef(null);
  const openingHoursRef = useRef(null);
  const closingHoursRef = useRef(null);
  const phoneNumberRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const acceptsDangerousLoadsRef = useRef(null);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");
  const [previousData, setPreviousData] = useState("");
  const navigate = useNavigate();

  const formatTime = (time) => {
    const [hours, minutes] = time.split(":");
    return `${hours}:${minutes}:00`;
  };

  useEffect(() => {
    fetch(`http://localhost:8080/logistic-companies/${user.id}`).then((res) =>
      res.json().then((data) => setPreviousData(data))
    );
  }, [user.id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      name: nameRef.current.value,
      opening_hours: openingHoursRef.current.value,
      closing_hours: closingHoursRef.current.value,
      phone_number: phoneNumberRef.current.value,
      email: emailRef.current.value,
      accepts_dangerous_loads: acceptsDangerousLoadsRef.current.checked,
      password: passwordRef.current.value,
    };

    try {
      setIsLoading(true);
      const response = await fetch(
        `http://localhost:8080/logistic-companies/${user.id}`,
        {
          method: "PUT",
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
        setMessage("Perfil atualizado com sucesso!");
        navigate("/dashboard");
      } else {
        setMessage("Erro ao atualizar perfil. Por favor, tente novamente.");
        setError(true);
      }
    } catch (error) {
      console.error("Erro ao atualizar perfil:", error);
      setMessage("Erro ao enviar formulário. Por favor, tente novamente.");
      setError(true);
    }
    setIsLoading(false);
  };

  return (
    <div className={styles.container}>
      <MenuComponent pageName={"Editar Perfil"} />
      <div className={styles.userProfileFormContainer}>
        {message && <Message message={message} isError={error} />}
        <form onSubmit={handleSubmit}>
          <h1>Editar Perfil</h1>
          <Input
            name="name"
            placeholder="Nome da Empresa"
            ref={nameRef}
            label={"Nome"}
            value={previousData ? previousData.name : ""}
          />
          <div className={styles["form-row"]}>
            <Input
              type="time"
              name="opening_hours"
              ref={openingHoursRef}
              label={"Horário de Abertura"}
              freeSize={false}
              value={previousData ? previousData.opening_hours : ""}
            />
            <Input
              type="time"
              name="closing_hours"
              ref={closingHoursRef}
              label={"Horário de Fechamento"}
              freeSize={false}
              value={previousData ? previousData.closing_hours : ""}
            />
          </div>
          <div className={styles["form-row"]}>
            <Input
              name="phone_number"
              placeholder="Telefone"
              ref={phoneNumberRef}
              label={"Telefone"}
              freeSize={false}
              value={previousData ? previousData.phone_number : ""}
            />
            <Input
              type="email"
              name="email"
              placeholder="E-mail"
              ref={emailRef}
              label={"E-mail"}
              freeSize={false}
              value={previousData ? previousData.email : ""}
            />
          </div>
          <Input
            type="password"
            name="password"
            placeholder="Senha"
            ref={passwordRef}
            label={"Senha"}
          />
          <label>
            <input
              type="checkbox"
              name="accepts_dangerous_loads"
              ref={acceptsDangerousLoadsRef}
            />
            Aceita carga perigosa
          </label>
          <Button
            type="submit"
            disabled={isLoading}
            title={isLoading ? "Enviando..." : "Salvar Alterações"}
            customSize
          />
        </form>
      </div>
    </div>
  );
}

export default UserProfileForm;
