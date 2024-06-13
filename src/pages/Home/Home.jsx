import React from "react";
import styles from "./Home.module.scss";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import imgcaminho from "../../assets/images/caminhao 1.svg";
import cd1 from "../../assets/images/cd1.jpeg";
import cd2 from "../../assets/images/cd2.jpeg";
import cd4 from "../../assets/images/cd4.jpeg";

function Home() {
  return (
    <div className={styles.container}>
      <div className={styles.topSection}>
        <div className={styles.homeBox}>
          <img
            className={styles.imagemCaminhao}
            src={imgcaminho}
            alt="imagem-box"
          />
        </div>
        <div className={styles.teste}>
          <div className={styles.rightSection}>
            <div className={styles.homeSide}>
              <h2>
                Juntos por uma entrega mais eficiente e com menos emissão de
                carbono
              </h2>
            </div>
          </div>
          <div className={styles.homeSpace}></div>
        </div>
      </div>
      <div className={styles.homeContent}>
        <div className={styles.textSection}>
          <h1>Explore nossas iniciativas:</h1>
          <h3>Mais produtos, mais entregas e mais saúde a cada rota</h3>
        </div>
        <div className={styles.carousel}>
          <Carousel showThumbs={false} showStatus={false} autoPlay infiniteLoop>
            <div>
              <img
                className={styles.homeImage}
                src={cd1}
                alt="Imagem 1"
              />
            </div>
            <div>
              <img
                className={styles.homeImage}
                src={cd2}
                alt="Imagem 2"
              />
            </div>
            <div>
              <img
                className={styles.homeImage}
                src={cd4}
                alt="Imagem 3"
              />
            </div>
          </Carousel>
        </div>
      </div>
    </div>
  );
}

export default Home;
