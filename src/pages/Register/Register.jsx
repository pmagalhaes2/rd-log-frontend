import React, { useRef, useState } from "react";
import styles from "./Register.module.scss";
import { Message } from "../../Components/Message";
import { useNavigate } from "react-router-dom";
import { Button } from "../../Components/Button";
import { Input } from "../../Components/Input";
import { Popup } from "../../Components/Popup";
import sucessImage from "../../assets/images/search-image.svg";
import { registerLogisticCompany } from "../../services/logisticCompaniesAPI";
import states from "./brazilian_states";
import { getCep } from "../../services/cepAPI";

function Register() {
  const nameRef = useRef(null);
  const cnpjRef = useRef(null);
  const openingHoursRef = useRef(null);
  const closingHoursRef = useRef(null);
  const priceKmRef = useRef(null);
  const phoneNumberRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const passwordConfirmRef = useRef(null);
  const addressCepRef = useRef(null);
  const addressTypeRef = useRef(null);
  const addressValueRef = useRef(null);
  const addressNumberRef = useRef(null);
  const addressCityRef = useRef(null);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [brazilianState, setBrazilianState] = useState("");
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
      price_km: priceKmRef.current.value,
      opening_hours: formatTime(openingHoursRef.current.value),
      closing_hours: formatTime(closingHoursRef.current.value),
      phone_number: phoneNumberRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
      address: {
        type: addressTypeRef.current.value,
        value: addressValueRef.current.value,
        number: addressNumberRef.current.value,
        city: addressCityRef.current.value,
        state: brazilianState,
        zipCode: addressCepRef.current.value,
      },
    };

    if (formData.password !== passwordConfirmRef.current.value) {
      setMessage("As senhas não coincidem. Tente novamente!");
      setError(true);
    } else {
      try {
        setIsLoading(true);
        const response = await registerLogisticCompany(formData);

        if (response) {
          setError(false);
          clearInputValues();
          setShowPopup(!showPopup);
        } else {
          const { data } = response.json();
          setMessage(`Erro: ${data.message}`);
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

  const clearInputValues = () => {
    nameRef.current.value = "";
    cnpjRef.current.value = "";
    priceKmRef.current.value= "";
    openingHoursRef.current.value = "";
    closingHoursRef.current.value = "";
    phoneNumberRef.current.value = "";
    emailRef.current.value = "";
    passwordRef.current.value = "";
    addressTypeRef.current.value = "";
    addressValueRef.current.value = "";
    addressNumberRef.current.value = "";
    addressCityRef.current.value = "";
    setBrazilianState("");
    addressCepRef.current.value = "";
  };

  const handleCep = async () => {
    try {
      if (addressCepRef.current.value.trim() === "") {
        return;
      } else {
        const previousAddress = await getCep(addressCepRef.current.value);
        const { logradouro, localidade, uf } = previousAddress;
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

  return (
    <div className={styles.container}>
      <div className={styles["register-container"]}>
        <form onSubmit={handleSubmit}>
          <h1>Cadastro de Empresa</h1>
          <div className={styles["form-row"]}>
            <Input
              name="name"
              placeholder={"ex: Transportes XYZ"}
              label={"Nome da empresa"}
              ref={nameRef}
            />
          </div>
          <div className={styles["form-row"]}>
            <Input
              name="cnpj"
              placeholder={"ex: 12.345.678/0001-90"}
              label={"CNPJ"}
              ref={cnpjRef}
            />
            <Input
              name="price_km"
              placeholder={"ex: R$1.90"}
              label={"Preço do Km"}
              ref={priceKmRef}
            />
          </div>
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
              name="zipCode"
              label={"CEP"}
              placeholder="ex: 01001000"
              ref={addressCepRef}
              searchInput
              onClick={handleCep}
            />
            <Input
              name="type"
              label={"Tipo Logradouro"}
              placeholder="ex: Rua"
              ref={addressTypeRef}
            />
          </div>
          <div className={styles["form-row"]}>
            <Input
              name="value"
              label={"Logradouro"}
              placeholder="ex: Praça da Sé"
              ref={addressValueRef}
            />
            <Input
              name="number"
              label={"Número"}
              placeholder="ex: 100"
              ref={addressNumberRef}
            />
          </div>
          <div className={styles["form-row"]}>
            <Input
              name="city"
              label={"Cidade"}
              placeholder="ex: São Paulo"
              ref={addressCityRef}
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
              ref={passwordConfirmRef}
            />
          </div>
          {message && <Message message={message} isError={error} />}
          <Button
            type="submit"
            disabled={isLoading}
            title={isLoading ? "Enviando..." : "Confirmar cadastro"}
            freeSize
          />
          {showPopup && (
            <Popup
              alt={"Imagem de confirmação de cadastro"}
              imageUrl={sucessImage}
              message={"Cadastro realizado com sucesso!"}
              onClick={() => navigate("/login")}
            />
          )}
        </form>
      </div>
    </div>
  );
}

export default Register;
