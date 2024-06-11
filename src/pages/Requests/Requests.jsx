import React, { useState, useEffect } from "react";
import styles from "./Requests.module.scss";
import MenuComponent from "../../Components/Menu/Menu";
import { Button } from "../../Components/Button";
import { getAllLogisticCompanies } from "../../services/logisticCompaniesAPI.js";
import { useLocation, useParams } from "react-router-dom";
import { Loading } from "../../Components/Loading";
import { Message } from "../../Components/Message";
import pack from "../../assets/images/Pack.png";
import { calculateDistanceAndDuration } from "../../services/distanceAPI.js";
export default function Requests() {
  const location = useLocation();
  const orderData = location.state;
  const [companies, setCompanies] = useState([]);
  const [showCompanies, setShowCompanies] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState("");
  const [priceValue, setPriceValue] = useState("00,00");
  const [origin, setOrigin] = useState();
  const [destination, setDestination] = useState();
  const [data, setData] = useState(new Date().toLocaleDateString());
  const [distanceValue, setDistanceValue] = useState("");
  const [estimatedTimeValue, setEstimatedTimeValue] = useState("");
  const [error, setError] = useState("");

  const params = useParams();
  const { orderId } = params;

  useEffect(() => {
    setOrigin(
      {
        street: orderData.origin_street,
        cep: orderData.origin_cep,
      } || ""
    );
    setDestination(
      {
        street: orderData.destination_street,
        cep: orderData.destination_cep,
      } || ""
    );
  }, [orderData]);

  useEffect(() => {
    getAllLogisticCompanies()
      .then((response) => {
        setCompanies(response);
        setShowCompanies(true);
      })
      .catch((error) => console.error("Erro ao buscar companhias:", error));
  }, []);

  const formatEstimatedValue = (value) => {
    return value.replace("hour", "hora").replace("hours", "horas");
  };

  const handleCalculateRoute = async () => {
    if (!origin || !destination) {
      setError("Por favor, preencha os campos de origem e destino.");
      return;
    }

    try {
      const response = await calculateDistanceAndDuration(
        origin.cep,
        destination.cep
      );

      if (response) {
        const distance = response.rows[0].elements[0].distance?.text || "0";
        const estimatedTime =
          response.rows[0].elements[0].duration?.text || "0";
        setDistanceValue(distance);
        setEstimatedTimeValue(formatEstimatedValue(estimatedTime));
        setPriceValue(`${priceValue || "00,00"}`);
        setError("");
      } else {
        setError("Nao foi possível calcular a rota. Tente novamente!");
      }
    } catch (error) {
      console.error("Erro ao calcular a rota:", error);
      setError("Nao foi possível calcular a rota. Tente novamente!");
    }
  };

  const handleSelectChange = (event) => {
    setSelectedCompany(event.target.value);
  };

  const handleOriginChange = (event) => {
    setOrigin(event.target.value);
  };

  const handleDestinationChange = (event) => {
    setDestination(event.target.value);
  };

  const handleDataChange = (event) => {
    setData(event.target.value);
  };

  return (
    <>
      <div className={styles.container}>
        <MenuComponent pageName={"Solicitações"} />
        <div className={styles.formContainer}>
          {!showCompanies && <Loading />}
          {showCompanies && (
            <>
              <span>
                <img src={pack} alt="Ícone de pacote" />
                <h3>
                  Solicitação de Entrega: <span>#ID {orderId}</span>
                </h3>
              </span>

              {error && <Message message={error} isError />}

              <div className={styles.form}>
                <div className={styles.calcRoute}>
                  <label htmlFor="origem">Endereço de origem:</label>
                  <input
                    id="origem"
                    onChange={handleOriginChange}
                    value={origin.street}
                    className={styles.inputLarge}
                  />
                  <label className={styles.destinoLabel} htmlFor="destino">
                    Endereço de destino:
                  </label>
                  <input
                    id="destino"
                    onChange={handleDestinationChange}
                    value={destination.street}
                    className={styles.inputLarge}
                  />
                  <div className={styles.dataValueInputs}>
                    <label htmlFor="data">Data:</label>
                    <input
                      type="text"
                      id="data"
                      value={data}
                      onChange={handleDataChange}
                      className={styles.inputSmall}
                    />
                    <br />
                  </div>
                  <Button
                    title="Calcular Rota"
                    freeSize={true}
                    className={styles.calcButton}
                    onClick={handleCalculateRoute}
                  />
                </div>

                <div className={styles.findTransport}>
                  <div className={styles.detailsButton}>
                    <div className={styles.details}>
                      <p>Distância: {distanceValue}</p>
                      <p>Tempo estimado: {estimatedTimeValue}</p>
                      <p>Valor: R$ {priceValue} </p>
                    </div>

                    {showCompanies && (
                      <>
                        <label htmlFor="dispTransp">
                          Transportadoras Disponíveis:
                        </label>
                        <select onChange={handleSelectChange}>
                          <option value="">Selecione uma transportadora</option>
                          {companies.map((company) => (
                            <option key={company.id} value={company.name}>
                              {company.name}
                            </option>
                          ))}
                        </select>
                      </>
                    )}
                  </div>
                  <Button
                    disabled={!selectedCompany}
                    freeSize={true}
                    title="Confirmar Solicitação"
                  />
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
