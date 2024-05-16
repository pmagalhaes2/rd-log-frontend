import React, { useRef, useState } from "react";
import { Message } from "../../Components/Message";
import { useNavigate } from "react-router-dom";
import { Button } from "../../Components/Button";
import { Input } from "../../Components/Input";
import MenuComponent from "../../Components/Menu/Menu";
import styles from "./UserProfileForm.module.scss";

function UserProfileForm({ onUpdate }) {
  const userProfile = {id: 2,  name: "Empresa Teste", opening_hours: "08:00:00", closing_hours: "18:00:00", phone_number: "1234567890", email: "", password: "", accepts_dangerous_loads: false};
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
  const navigate = useNavigate();

  const formatTime = (time) => {
    const [hours, minutes] = time.split(":");
    return `${hours}:${minutes}:00`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Verifica se userProfile está definido, POREM NÃO ESTOU USANDO NENHUM ID DE USUÁRIO
    if (!userProfile) {
      console.error("UserProfile não definido.");
      return;
    }
  
    const formData = {
      name: nameRef.current.value,
      opening_hours: openingHoursRef.current.value,
      closing_hours: closingHoursRef.current.value,
      phone_number: phoneNumberRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
      accepts_dangerous_loads: acceptsDangerousLoadsRef.current.checked,
    };

    console.log("formData:", formData);
  
    try {
      setIsLoading(true);
      const response = await fetch(
        `http://localhost:8080/logistic-companies/${userProfile.id}`,
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
        onUpdate(formData);
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
          <div>CNPJ: {userProfile ? userProfile.cnpj : ""}</div>
          <Input name="name" onChange={() => console.log(nameRef.current.value)} placeholder="Nome da Empresa" defaultValue={userProfile ? userProfile.name : ""} ref={nameRef} />
          <div className={styles.formRow}>
            <Input type="time" name="opening_hours" defaultValue={userProfile ? userProfile.opening_hours : ""} ref={openingHoursRef} />
            <Input type="time" name="closing_hours" defaultValue={userProfile ? userProfile.closing_hours : ""} ref={closingHoursRef} />
          </div>
          <Input name="phone_number" placeholder="Telefone" defaultValue={userProfile ? userProfile.phone_number : ""} ref={phoneNumberRef} />
          <Input type="email" name="email" placeholder="E-mail" defaultValue={userProfile ? userProfile.email : ""} ref={emailRef} />
          <Input type="password" name="password" placeholder="Senha" defaultValue={userProfile ? userProfile.password : ""} ref={passwordRef} />
          <div className={styles.formRow}>
            <label>
              <input type="checkbox" name="accepts_dangerous_loads" defaultChecked={userProfile ? userProfile.accepts_dangerous_loads : false} ref={acceptsDangerousLoadsRef} />
              Aceita carga perigosa
            </label>
          </div>
          <Button type="submit" disabled={isLoading} title={isLoading ? "Enviando..." : "Salvar Alterações"} customSize  />
        </form>
      </div>
    </div>
  );
}

export default UserProfileForm;
