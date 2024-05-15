import React, { useState, useEffect } from 'react';
import styles from './Requests.module.scss';
import MenuComponent from '../../Components/Menu/Menu';
import { Input } from '../../Components/Input';

export default function Requests() {
  const [companies, setCompanies] = useState([]);
  const [showCompanies, setShowCompanies] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [valorP, setValorP] = useState('R$ 00,00');

  useEffect(() => {
    fetch('http://localhost:8080/logistic-companies')
      .then((response) => response.json())
      .then((data) => {
        setCompanies(data);
        console.log(data); 
      })
      .catch((error) => console.error('Erro ao buscar companhias:', error));
  }, []);

  const handleCalculateRoute = () => {
    setShowCompanies(true);
    setValorP(`R$ ${inputValue || '00,00'}`);
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

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
                <input type="text" id="valor" value={inputValue} onChange={handleInputChange} placeholder="R$ 00,00"></input>
                <label htmlFor="data">Data:</label>
                <input type="text" id="data" placeholder="dd/mm/aaaa"></input>
                <br />
              </div>

              <button className={styles.calcButton} onClick={handleCalculateRoute}>
                Calcular Rota
              </button>
            </div>

            <div className={styles.findTransport}>
              <div className={styles.details}>
                <p>Distância: 0km</p>
                <p>Valor: {valorP}</p>
                <p>Tempo estimado: 0hr</p>
              </div>

              {showCompanies && (
                <>
                  <h3>Buscar Transporte</h3>
                  <label htmlFor="dispTransp">Transportadoras Disponíveis:</label>
                  <select>
                    {companies.map((company) => (
                      <option key={company.id}>{company.name}</option>
                    ))}
                  </select>
                </>
              )}
            </div>
          </div>
          <button className={styles.confirmButton}>Confirmar Solicitação</button>
        </div>
      </div>
    </>
  );
}
