import React, { useEffect, useRef, useState } from "react";
import { Message } from "../../Components/Message";
import { useNavigate } from "react-router-dom";
import { Button } from "../../Components/Button";
import { Input } from "../../Components/Input";
import MenuComponent from "../../Components/Menu/Menu";
import styles from "./UserProfileForm.module.scss";
import { useUser } from "../../context/UserContext";
import { Loading } from "../../Components/Loading";
import { Popup } from "../../Components/Popup";
import successImg from "../../assets/images/success-image.svg";
import {
  getById,
  updateLogisticCompany,
} from "../../services/logisticCompaniesAPI";
import {
  getAdministratorById,
  updateAdministrator,
} from "../../services/administratorsAPI";

function UserProfileForm() {
  const { user, setUser } = useUser();

  const nameRef = useRef(null);
  const openingHoursRef = useRef(null);
  const closingHoursRef = useRef(null);
  const phoneNumberRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const passwordConfirmRef = useRef(null);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");
  const [previousData, setPreviousData] = useState("");
  const [fetchData, setFetchData] = useState(true);
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();

  const formatTime = (time) => {
    const [hours, minutes] = time.split(":");
    return `${hours}:${minutes}:00`;
  };

  const getLogisticCompany = async (logisticCompanyId) => {
    await getById(logisticCompanyId).then((res) => {
      setPreviousData(res);
      setFetchData(false);
    });
  };

  const getAdministrator = async (administratorId) => {
    await getAdministratorById(administratorId).then((res) => {
      setPreviousData(res);
      setFetchData(false);
    });
  };

  useEffect(() => {
    if (user.role !== "admin") {
      getLogisticCompany(user.id);
    } else {
      getAdministrator(user.id);
    }
  }, [user.id, user.role]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData =
      user.role !== "admin"
        ? {
            name: nameRef.current.value,
            opening_hours: formatTime(openingHoursRef.current.value),
            closing_hours: formatTime(closingHoursRef.current.value),
            phone_number: phoneNumberRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value,
          }
        : {
            name: nameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value,
          };

    if (formData.password !== passwordConfirmRef.current.value) {
      setMessage("As senhas não coincidem. Tente novamente!");
      setError(true);
      return;
    }

    try {
      setIsLoading(true);
      const response =
        user.role !== "admin"
          ? await updateLogisticCompany(user.id, formData)
          : await updateAdministrator(user.id, formData);

      if (response) {
        setMessage("Perfil atualizado com sucesso!");
        setShowPopup(!showPopup);
        setUser({ ...user, username: nameRef.current.value });
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
        {fetchData && <Loading />}
        {previousData && (
          <form onSubmit={handleSubmit}>
            <h1>Editar Perfil</h1>
            {message && <Message message={message} isError={error} />}
            <Input
              name="name"
              placeholder="Nome da Empresa"
              ref={nameRef}
              label={"Nome"}
              defaultValue={previousData.name}
            />

            {user.role !== "admin" && (
              <div className={styles["form-row"]}>
                <Input
                  type="time"
                  name="opening_hours"
                  ref={openingHoursRef}
                  label={"Horário de Abertura"}
                  freeSize={false}
                  defaultValue={previousData.opening_hours}
                />
                <Input
                  type="time"
                  name="closing_hours"
                  ref={closingHoursRef}
                  label={"Horário de Fechamento"}
                  freeSize={false}
                  defaultValue={previousData.closing_hours}
                />
              </div>
            )}
            <div className={styles["form-row"]}>
              {user.role !== "admin" ? (
                <Input
                  name="phone_number"
                  placeholder="Telefone"
                  ref={phoneNumberRef}
                  label={"Telefone"}
                  freeSize={false}
                  defaultValue={previousData.phone_number}
                />
              ) : (
                <Input
                  name="cpf"
                  placeholder="CPF"
                  label={"CPF"}
                  freeSize={false}
                  defaultValue={previousData.cpf}
                  disabled
                />
              )}
              <Input
                type="email"
                name="email"
                placeholder="E-mail"
                ref={emailRef}
                label={"E-mail"}
                freeSize={false}
                defaultValue={previousData.email}
              />
            </div>
            <div className={styles["form-row"]}>
              <Input
                type="password"
                name="password"
                placeholder="Senha"
                ref={passwordRef}
                label={"Senha"}
                defaultValue={previousData.password}
              />
              <Input
                type="password"
                name="confirm_password"
                label={"Confirmação senha"}
                placeholder="Confirmação de senha"
                ref={passwordConfirmRef}
              />
            </div>
            <Button
              type="submit"
              disabled={isLoading}
              title={isLoading ? "Enviando..." : "Salvar Alterações"}
              customSize
            />
          </form>
        )}
        {showPopup && (
          <Popup
            alt={"Imagem de confirmação de alteração"}
            imageUrl={successImg}
            message={message}
            onClick={() => navigate("/dashboard")}
          />
        )}
      </div>
    </div>
  );
}

export default UserProfileForm;
