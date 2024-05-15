import React from 'react'
import Header from '../../Components/Header/Header'
import Footer from '../../Components/Footer/Footer'
import styles from './Requests.module.scss';
import MenuComponent from '../../Components/Menu/Menu';
import { Input } from '../../Components/Input';

export default function Requests() {
    return (
      <>
        <div className={styles.container}>
          <MenuComponent />
          <div className={styles.formContainer}>
            <h3>Solicitação de Entregas</h3>
  
            <div className={styles.form}>
              <div className={styles.calcRoute}>
                <label htmlFor="origem">Endereço de origem:</label>
                <Input id="origem" />
                <label className={styles.destinoLabel} htmlFor="destino">Endereço de destino:</label>
                <Input id="destino" />
                <div className={styles.dataValueInputs}>
                  <label htmlFor="valor">Valor:</label>
                  <input type="text" id="valor" placeholder="R$ 00,00"></input>
                  <label htmlFor="data">Data:</label>
                  <input type="text" id="data" placeholder="dd/mm/aaaa"></input>
                  <br />
                </div>
  
                <button className={styles.calcButton}>Calcular Rota</button>
              </div>
  
              <div className={styles.findTransport}>
                <div className={styles.details}>
                    <p>Distância: 0km</p>
                    <p>Valor: R$ 00,00</p>
                    <p>Tempo estimado: 0hr</p>
                </div>

                <h3>Buscar Transporte</h3>
                <label htmlFor="dispTransp">Transportadoras Disponíveis:</label>
                <select>
                    <option>RDTrans</option>
                    <option>Rodonaves</option>
                    <option>Correios</option>
                    <option>TransBrasil</option>

                </select>
              </div>
            </div>
                <button className={styles.confirmButton}>Confirmar Solcitação</button>
          </div>
        </div>
      </>
    );
  }