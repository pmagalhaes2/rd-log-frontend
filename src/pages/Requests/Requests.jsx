import React, { useState, useEffect } from "react";
import styles from "./Requests.module.scss";
import MenuComponent from "../../Components/Menu/Menu";
import { Button } from "../../Components/Button";
import { Input } from "../../Components/Input";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Loading } from "../../Components/Loading";
import { LogisticDeliveryCard } from "../../Components/LogisticDeliveryCard";
import { Message } from "../../Components/Message";
import pack from "../../assets/images/Pack.png";
import lowPriceIcon from "../../assets/images/low-price-icon.svg";
import inTransitIcon from "../../assets/images/in-transit-icon.svg";
import { calculateDistanceAndDuration } from "../../services/distanceAPI.js";
import { updateOrder } from "../../services/ordersAPI.js";
import { Popup } from "../../Components/Popup/index.jsx";
import deliveryImage from "../../assets/images/delivery-location.svg";

export default function Requests() {
  const location = useLocation();
  const orderData = location.state;
  const [companies, setCompanies] = useState([]);
  const [showCompanies, setShowCompanies] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState("");
  const [origin, setOrigin] = useState({ street: "", cep: "" });
  const [destination, setDestination] = useState({ street: "", cep: "" });
  const [data] = useState(new Date().toLocaleDateString());
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  const params = useParams();
  const { orderId } = params;

  const navigate = useNavigate();

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

  const formatEstimatedValue = (value) => {
    return value
      .replace("hour", "hora")
      .replace("hours", "horas")
      .replace("minutes", "minutos");
  };

  const formatPrice = (price) => {
    const formattedPrice = parseFloat(price).toFixed(2);
    return formattedPrice.replace(".", ",");
  };

  const handleSearchLogisticCompanies = async () => {
    if (!origin || !destination) {
      setError("Por favor, preencha os campos de origem e destino.");
      return;
    }

    try {
      setLoading(true);
      const response = await calculateDistanceAndDuration(
        origin.cep,
        destination.cep
      );

      if (response && response.length > 0) {
        setCompanies(response);
        setShowCompanies(true);
        setError("");
      } else {
        setError("Ocorreu um erro ao calcular a rota. Tente novamente!");
      }
    } catch (error) {
      console.error("Erro ao calcular a rota:", error);
      setError(error.data.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectChange = (event) => {
    setSelectedCompany(event.target.value);
  };

  const handleSubmit = async () => {
    try {
      const response = await updateOrder(
        orderId,
        selectedCompany,
        "Em andamento"
      );

      if (response) {
        setShowPopup(!showPopup);
      }
    } catch (error) {
      setError("Ocorreu um erro ao calcular a rota. Tente novamente!");
    }
  };

  return (
    <>
      <div className={styles.container}>
        <MenuComponent pageName={"Solicitações"} />
        <div className={styles.formContainer}>
          <>
            <span>
              <img src={pack} alt="Ícone de pacote" />
              <h3>
                Solicitação de Entrega: <span>#ID {orderId}</span>
              </h3>
            </span>

            <div className={styles.form}>
              <div className={styles.calcRoute}>
                <Input
                  label="Endereço de origem:"
                  id="origem"
                  value={origin.street}
                  disabled
                />
                <Input
                  label="Endereço de destino:"
                  id="destino"
                  value={destination.street}
                  disabled
                />
                <Input
                  label="Data:"
                  type="text"
                  id="data"
                  value={data}
                  disabled
                />

                {error && <Message message={error} isError />}

                {!showCompanies && (
                  <Button
                    title="Buscar Entrega"
                    freeSize={true}
                    className={styles.calcButton}
                    onClick={handleSearchLogisticCompanies}
                  />
                )}
              </div>

              <div className={styles.findTransport}>
                {loading ? (
                  <Loading />
                ) : (
                  showCompanies &&
                  companies.length > 0 && (
                    <>
                      {companies.map((company) => (
                        <LogisticDeliveryCard
                          key={company.logistic_name}
                          urlImg={
                            company.closest_company
                              ? inTransitIcon
                              : lowPriceIcon
                          }
                          alt=""
                          logisticName={company.logistic_name}
                          time={formatEstimatedValue(company.duration)}
                          price={formatPrice(company.price_km)}
                          id={company.logistic_id}
                          value={company.logistic_id}
                          onClick={handleSelectChange}
                        />
                      ))}
                      <Button
                        disabled={!selectedCompany}
                        freeSize={true}
                        title="Confirmar Solicitação"
                        onClick={handleSubmit}
                      />
                    </>
                  )
                )}
              </div>
            </div>
          </>
        </div>
      </div>

      {showPopup && (
        <Popup
          alt={"Imagem de confirmação de solicitação"}
          imageUrl={deliveryImage}
          message={"Solicitação enviada com sucesso!"}
          onClick={() => navigate("/orders")}
        />
      )}
    </>
  );
}
