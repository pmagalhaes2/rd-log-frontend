import React, { useState, useEffect } from 'react';
import styles from './Requests.module.scss';
import MenuComponent from '../../Components/Menu/Menu';
import { Input } from '../../Components/Input';
import { Button } from '../../Components/Button';

export default function Requests() {
  const [companies, setCompanies] = useState([]);
  const [showCompanies, setShowCompanies] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [valorP, setValorP] = useState('R$ 00,00');

  useEffect(() => {
    fetch('http://localhost:8080/logistic-companies')
      .then((response) => response.json())
      .then((data) => {
        setCompanies(data);
        setShowCompanies(true);
      })
      .catch((error) => console.error('Erro ao buscar companhias:', error));
  }, []);

  const handleCalculateRoute = () => {
    setShowCompanies(true);
    setValorP(`R$ ${inputValue || '00,00'}`);
  };

  const handleSelectChange = (event) => {
    setSelectedCompany(event.target.value);
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
                <label htmlFor="valor">Tipo Entrega:</label>
                <input type="text" id="tipoEntrega" value={inputValue} placeholder="B2B/B2C"/>
              
                <label htmlFor="data">Data:</label>
                <input type="text" id="data" placeholder="dd/mm/aaaa"></input>
                <br />
              </div>
              <Button title='Calcular Rota' freeSize={true} className={styles.calcButton} onClick={handleCalculateRoute}/>
            </div>

            <div className={styles.findTransport}>
              <div className={styles.detailsButton}>
              <div className={styles.details}>
                <p>Distância: 0km</p>
                <p>Tipo Entrega: B2B </p>
                <p>Tempo estimado: 0hr</p>
                <p>Valor: {valorP}</p>
              </div>

              {showCompanies && (
                <>
                  <h3>Buscar Transporte</h3>
                  <label htmlFor="dispTransp">Transportadoras Disponíveis:</label>
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
                title='Confirmar Solicitação'
              />
          </div>
          </div>
        </div>
      </div>
    </>
  );
}
