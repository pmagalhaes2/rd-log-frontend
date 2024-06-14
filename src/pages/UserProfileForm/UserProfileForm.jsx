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
import deleteImg from "../../assets/images/encerrado.svg";
import {
  getById,
  updateLogisticCompany,
  deleteLogisticCompany
} from "../../services/logisticCompaniesAPI";
import {
  getAdministratorById,
  updateAdministrator,
} from "../../services/administratorsAPI";
import { formatTime } from "../../utils/formatters/formatDate";
import { formatCurrency } from "../../utils/formatters/formatCurrency";
import { removeMask } from "../../utils/formatters/removeMask";
import { formatCnpj } from "../../utils/formatters/formatCnpj";
import { formatCpf } from "../../utils/formatters/formatCpf";
import states from "../Register/brazilian_states";
import { getCep } from "../../services/cepAPI";

function UserProfileForm() {
  const { user, setUser } = useUser();
  const navigate = useNavigate();

  const nameRef = useRef(null);
  const openingHoursRef = useRef(null);
  const closingHoursRef = useRef(null);
  const phoneNumberRef = useRef(null);
  const emailRef = useRef(null);
  const priceKmRef = useRef(null);
  const addressComplementRef = useRef(null);
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
  const [brazilianState, setBrazilianState] = useState("");
  const [zipCode, setZipCode] = useState("");

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

  const handleDeleteLogisticCompany = async () => {
    try {
      await deleteLogisticCompany(user.id);
      setMessage("Conta excluída com sucesso!");
      setShowPopup(true);
      setTimeout(() => {
        setShowPopup(false);
        navigate("/");
      }, 5000);
    } catch (error) {
      console.error("Erro ao excluir conta:", error);
      setMessage("Erro ao excluir conta. Por favor, tente novamente.");
      setError(true);
    }
  };
  
  const handleCep = async () => {
    try {
      if (addressZipCodeRef.current.value.trim() === "") {
        return;
      } else {
        const previousAddress = await getCep(addressZipCodeRef.current.value);
        const { logradouro, localidade, uf } = previousAddress;
        setZipCode(addressZipCodeRef.current.value); 
        addressValueRef.current.value = logradouro;
        addressCityRef.current.value = localidade;
        setBrazilianState(uf);
      }
    } catch (error) {
      console.error("Erro ao consultar CEP:", error);
      setMessage("Erro ao buscar CEP. Por favor, tente novamente.");
      setError(true);
    }
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
      if (nameRef.current) nameRef.current.value = previousData.name || "";
      if (openingHoursRef.current) openingHoursRef.current.value = previousData.opening_hours || "";
      if (closingHoursRef.current) closingHoursRef.current.value = previousData.closing_hours || "";
      if (phoneNumberRef.current) phoneNumberRef.current.value = previousData.phone_number || "";
      if (emailRef.current) emailRef.current.value = previousData.email || "";
      if (priceKmRef.current) priceKmRef.current.value = previousData.price_km || "";
      if (addressComplementRef.current) addressComplementRef.current.value = previousData.address?.complement || "";
      if (addressValueRef.current) addressValueRef.current.value = previousData.address?.value || "";
      if (addressNumberRef.current) addressNumberRef.current.value = previousData.address?.number || "";
      if (addressCityRef.current) addressCityRef.current.value = previousData.address?.city || "";
      if (addressStateRef.current) setBrazilianState(previousData.address?.state || "");
      if (addressZipCodeRef.current) addressZipCodeRef.current.value = previousData.address?.zipCode || "";
      if (addressZipCodeRef.current) setZipCode(previousData.address?.zipCode || ""); 
    }
  }, [previousData]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData =
      user.role !== "admin"
        ? {
            name: nameRef.current ? nameRef.current.value : "",
            opening_hours: openingHoursRef.current ? formatTime(openingHoursRef.current.value) : "",
            closing_hours: closingHoursRef.current ? formatTime(closingHoursRef.current.value) : "",
            phone_number: phoneNumberRef.current ? removeMask(phoneNumberRef.current.value) : "",
            price_km: priceKmRef.current ? formatCurrency(priceKmRef.current.value) : "",
            email: emailRef.current ? emailRef.current.value : "",
            address: {
              complement: addressComplementRef.current ? addressComplementRef.current.value : "",
              value: addressValueRef.current ? addressValueRef.current.value : "",
              number: addressNumberRef.current ? addressNumberRef.current.value : "",
              city: addressCityRef.current ? addressCityRef.current.value : "",
              state: brazilianState,
              zipCode: addressZipCodeRef.current ? removeMask(addressZipCodeRef.current.value) : "",
            },
            password: passwordRef.current ? passwordRef.current.value : "",
          }
        : {
            name: nameRef.current ? nameRef.current.value : "",
            email: emailRef.current ? emailRef.current.value : "",
            password: passwordRef.current ? passwordRef.current.value : "",
          };

    if (passwordRef.current && passwordConfirmRef.current && formData.password !== passwordConfirmRef.current.value) {
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
              <>
                <div className={styles["form-row"]}>
                  <Input
                    name="cnpj"
                    placeholder="CNPJ"
                    label={"CNPJ"}
                    freeSize={false}
                    defaultValue={previousData ? formatCnpj(previousData.cnpj) : ""}
                    disabled
                  />
                  <Input
                    name="price_km"
                    ref={priceKmRef}
                    label={"Preço do Km"}
                    mask={"R$ 9,99"}
                  />
                </div>
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
                    label={"CEP"}
                    placeholder="ex: 01001000"
                    ref={addressZipCodeRef}
                    searchInput
                    onClick={handleCep}
                    mask={"99999-999"}
                    alwaysShowMask
                    value={zipCode} 
                    onChange={(e) => setZipCode(e.target.value)} 
                  />
                  <Input
                    name="address_value"
                    ref={addressValueRef}
                    label={"Logradouro"}
                    freeSize={false}
                  />
                </div>
                <div className={styles["form-row"]}>
                  <Input
                    name="address_number"
                    ref={addressNumberRef}
                    label={"Número"}
                    freeSize={false}
                  />
                  <Input
                    name="address_complement"
                    ref={addressComplementRef}
                    label={"Complemento"}
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
                  <div className={styles.state_container}>
                    <label>Estado</label>
                    <select
                      value={brazilianState}
                      onChange={(e) => setBrazilianState(e.target.value)}
                      className={styles.state_select}
                    >
                      <option value="">Selecione um estado</option>
                      {states.map((state) => (
                        <option key={state.sigla} value={state.sigla}>
                          {state.nome}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </>
            )}

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
                  defaultValue={previousData ? formatCpf(previousData.cpf) : ""}
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
            <div className={styles.buttonContainer}>
              <Button
                type="submit"
                disabled={isLoading}
                title={isLoading ? "Enviando..." : "Salvar Alterações"}
                customSize
              />
              {showPopup && (
                <Popup
                  alt={"Imagem de confirmação de alteração"}
                  imageUrl={successImg}
                  message={message}
                  onClick={() => navigate("/dashboard")}
                />
              )}
              {user.role === "user" && (
                <div className={styles.deleteButtonContainer}>
                  <Button
                    type="button"
                    onClick={handleDeleteLogisticCompany}
                    title="Excluir Conta"
                    customSize
                    orangeButton 
                  />
                  {showPopup && (
                    <Popup
                      alt={"Imagem de confirmação de exclusão"}
                      imageUrl={deleteImg}
                      message={message}
                      onClick={() => navigate("/dashboard")}
                    />
                  )}
                </div>
              )}
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default UserProfileForm;
