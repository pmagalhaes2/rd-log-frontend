import styles from "./LogisticDeliveryCard.module.scss";

export const LogisticDeliveryCard = ({
  urlImg,
  logisticName = "Chiquinho Transportes LTDA",
  time = "10",
  price = "19,99",
}) => {
  return (
    <div className={styles.container}>
      <img src={urlImg} alt="Ícone de caminhão de entrega" />
      <div className={styles.text_container}>
        <h4>{logisticName}</h4>
        <span>Receba em até {time}</span>
      </div>
      <div className={styles.price_container}>
        <span>R${price}</span>
        <input type="radio" name="logistic" id="logistic" />
      </div>
    </div>
  );
};
