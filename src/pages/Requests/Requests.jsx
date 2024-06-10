import React, { useState, useEffect } from "react";
import styles from "./Requests.module.scss";
import MenuComponent from "../../Components/Menu/Menu";
import { Button } from "../../Components/Button";
import { getAllLogisticCompanies } from "../../services/logisticCompaniesAPI.js";
import { useLocation, useParams } from "react-router-dom";
import { Loading } from "../../Components/Loading";

export default function Requests() {
  const location = useLocation();
  const orderData = location.state || {};
  const [companies, setCompanies] = useState([]);
  const [showCompanies, setShowCompanies] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [valorP, setValorP] = useState("R$ 00,00");
  const [origem, setOrigem] = useState(orderData.solicitante || "");
  const [destino, setDestino] = useState(orderData.destinatario || "");
  const [data, setData] = useState(new Date().toLocaleDateString());

  const params = useParams();
  const { orderId } = params;

  useEffect(() => {
    getAllLogisticCompanies()
      .then((response) => {
        setCompanies(response);
        setShowCompanies(true);
      })
      .catch((error) => console.error("Erro ao buscar companhias:", error));
  }, []);

  const handleCalculateRoute = () => {
    setShowCompanies(true);
    setValorP(`R$ ${inputValue || "00,00"}`);
  };

  const handleSelectChange = (event) => {
    setSelectedCompany(event.target.value);
  };

  const handleOrigemChange = (event) => {
    setOrigem(event.target.value);
  };

  const handleDestinoChange = (event) => {
    setDestino(event.target.value);
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
              <h3>
                Solicitação de Entrega: <span>#ID {orderId}</span>
              </h3>

              <div className={styles.form}>
                <div className={styles.calcRoute}>
                  <label htmlFor="origem">Endereço de origem:</label>
                  <input
                    id="origem"
                    onChange={handleOrigemChange}
                    value={origem}
                    className={styles.inputLarge}
                  />
                  <label className={styles.destinoLabel} htmlFor="destino">
                    Endereço de destino:
                  </label>
                  <input
                    id="destino"
                    onChange={handleDestinoChange}
                    value={destino}
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
                      <p>Distância: 0km</p>
                      <p>Tempo estimado: 0hr</p>
                      <p>Valor: </p>
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
