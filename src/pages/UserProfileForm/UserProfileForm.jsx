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
import { formatTime } from "../../utils/formatters/formatDate";
import { formatCurrency } from "../../utils/formatters/formatCurrency";
import { removeMask } from "../../utils/formatters/removeMask";

function UserProfileForm() {
  const { user, setUser } = useUser();

  const nameRef = useRef(null);
  const openingHoursRef = useRef(null);
  const closingHoursRef = useRef(null);
  const phoneNumberRef = useRef(null);
  const emailRef = useRef(null);
  const priceKmRef = useRef(null);
  const addressTypeRef = useRef(null);
  const addressValueRef = useRef(null);
  const addressNumberRef = useRef(null);
  const addressCityRef = useRef(null);
  const addressStateRef = useRef(null);
  const addressZipCodeRef = useRef(null);
  const passwordRef = useRef(null);
  const passwordConfirmRef = useRef(null);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");
  const [previousData, setPreviousData] = useState(null);
  const [fetchData, setFetchData] = useState(true);
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();

  const getLogisticCompany = async (logisticCompanyId) => {
    const res = await getById(logisticCompanyId);
    setPreviousData(res);
    setFetchData(false);
  };

  const getAdministrator = async (administratorId) => {
    const res = await getAdministratorById(administratorId);
    setPreviousData(res);
    setFetchData(false);
  };

  useEffect(() => {
    if (user.role !== "admin") {
      getLogisticCompany(user.id);
    } else {
      getAdministrator(user.id);
    }
  }, [user.id, user.role]);

  useEffect(() => {
    if (previousData) {
      nameRef.current.value = previousData.name;
      openingHoursRef.current.value = previousData.opening_hours;
      closingHoursRef.current.value = previousData.closing_hours;
      phoneNumberRef.current.value = previousData.phone_number;
      emailRef.current.value = previousData.email;
      priceKmRef.current.value = previousData.price_km;
      addressTypeRef.current.value = previousData.address?.type;
      addressValueRef.current.value = previousData.address?.value;
      addressNumberRef.current.value = previousData.address?.number;
      addressCityRef.current.value = previousData.address?.city;
      addressStateRef.current.value = previousData.address?.state;
      addressZipCodeRef.current.value = previousData.address?.zipCode;
      
    }
  }, [previousData]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData =
      user.role !== "admin"
        ? {
            name: nameRef.current.value,
            opening_hours: formatTime(openingHoursRef.current.value),
            closing_hours: formatTime(closingHoursRef.current.value),
            phone_number: phoneNumberRef.current.value,
            price_km: formatCurrency(priceKmRef.current.value),
            email: emailRef.current.value,
            address: {
              type: addressTypeRef.current.value,
              value: addressValueRef.current.value,
              number: addressNumberRef.current.value,
              city: addressCityRef.current.value,
              state: addressStateRef.current.value,
              zipCode: removeMask(addressZipCodeRef.current.value),
            },
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
            />

            {user.role !== "admin" && (
              <div className={styles["form-row"]}>
                <Input
                  name="cnpj"
                  placeholder="CNPJ"
                  label={"CNPJ"}
                  freeSize={false}
                  defaultValue={previousData.cnpj}
                  mask="99.999.999/9999-99"
                  disabled
                />
                <Input
                  name="price_km"
                  ref={priceKmRef}
                  label={"Preço do Km"}
                  mask={"R$ 9,99"}
                />
              </div>
              
            )}
            <div className={styles["form-row"]}>
                <Input
                  type="time"
                  name="opening_hours"
                  ref={openingHoursRef}
                  label={"Horário de Abertura"}
                />
                <Input
                  type="time"
                  name="closing_hours"
                  ref={closingHoursRef}
                  label={"Horário de Fechamento"}
                />
              </div>
              <div className={styles["form-row"]}>
                <Input
                  name="zipCode"
                  ref={addressZipCodeRef}
                  label={"CEP"}
                  freeSize={false}
                  mask={"99999-999"}
                />
                <Input
                  name="address_type"
                  ref={addressTypeRef}
                  label={"Tipo de Logradouro"}
                  freeSize={false}
                />
              </div>
            
              <div className={styles["form-row"]}>
                <Input
                  name="address_value"
                  ref={addressValueRef}
                  label={"Nome do Logradouro"}
                  freeSize={false}
                />
                <Input
                  name="address_number"
                  ref={addressNumberRef}
                  label={"Número"}
                  freeSize={false}
                />
              </div>

              <div className={styles["form-row"]}>
                <Input
                  name="address_city"
                  ref={addressCityRef}
                  label={"Cidade"}
                  freeSize={false}
                />
                <Input
                  name="address_state"
                  ref={addressStateRef}
                  label={"Estado"}
                  freeSize={false}
                />
              </div>

            <div className={styles["form-row"]}>
              {user.role !== "admin" ? (
                <Input
                  name="phone_number"
                  placeholder="Telefone"
                  ref={phoneNumberRef}
                  label={"Telefone"}
                  freeSize={false}
                  mask="(99) 99999-9999"
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
              />
            </div>
            <div className={styles["form-row"]}>
              <Input
                type="password"
                name="password"
                placeholder="Senha"
                ref={passwordRef}
                label={"Senha"}
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
