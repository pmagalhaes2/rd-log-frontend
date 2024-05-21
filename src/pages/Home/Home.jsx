import React from "react";
import styles from './Home.module.scss';
import cd1 from '../../assets/images/cd1.jpeg';
import cd2 from '../../assets/images/cd2.jpeg';
import cd3 from '../../assets/images/cd3.jpeg';

function Home() {
  return (
    <div className={styles.container}>

      <div className={styles.box}>
        <h1> RDlog </h1>
        <p>A RDLog é uma empresa de logística inovadora,
           especializada em transporte sustentável com baixa emissão de carbono. 
           Com um foco em eficiência, a empresa utiliza tecnologias avançadas para otimizar rotas e reduzir o consumo de combustível.
           Além de sustentável, a RDLog se destaca pela segurança de suas operações, garantindo a integridade das cargas transportadas.
           O compromisso com a rapidez é outro diferencial, assegurando entregas pontuais e ágeis.
           A RDLog está redefinindo o setor logístico, alinhando responsabilidade ambiental com excelência operacional.</p>
        <div className={styles.card}>
          <div>
            <img src={cd1} alt="cd1" />
            <p>Eficiência em logística</p>
          </div>
          <div>
            <img src={cd2} alt="cd2" />
            <p>Rotas otimizadas</p>
          </div>
          <div>
            <img src={cd3} alt="cd3" />
            <p>Menos emissão de carbono</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;