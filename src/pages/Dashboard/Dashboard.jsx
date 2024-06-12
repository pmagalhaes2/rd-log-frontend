import React, { useState, useEffect } from 'react';
import styles from './Dashboard.module.scss'; 
import MenuComponent from '../../Components/Menu/Menu'; 
import Card from '../../Components/Card/Card'; 
import { AreaChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Area } from 'recharts';
import { useUser } from '../../context/UserContext';

function Dashboard() {
  const [ordersData, setOrdersData] = useState([]);
  const { user } = useUser();

  useEffect(() => {
    const fetchUserData = async () => {
      if (user.role === "admin") {
        setOrdersData([
          { name: 'Edu Transportes LTDA.', Atrasados: 79, Tempestivos: 7, Antecipados: 3 },
          { name: 'Chiquinho Transportes LTDA.', Atrasados: 8, Tempestivos: 10, Antecipados: 18 },
          { name: 'The Best Transportes LTDA.', Atrasados: 9, Tempestivos: 129, Antecipados: 123 },
          { name: 'Theodoro Transportes LTDA.', Atrasados: 11, Tempestivos: 63, Antecipados: 68 },
          { name: 'Nuno Transportes LTDA.', Atrasados: 51, Tempestivos: 16, Antecipados: 13 },
          { name: 'Tech Girls Transportes LTDA.', Atrasados: 6, Tempestivos: 69, Antecipados: 72 },
        ]);
      } else {
        setOrdersData([
          { name: 'Abril', Atrasados: 8, Tempestivos: 10, Antecipados: 18 },
          { name: 'Maio', Atrasados: 11, Tempestivos: 23, Antecipados: 30 },
          { name: 'Junho', Atrasados: 6, Tempestivos: 68, Antecipados: 72 },
        ]);
      }
    };

    fetchUserData();
  }, [user.id, user.role]);

  return (
    <div className={styles.container}>
      <MenuComponent pageName="Dashboard" />
      <div className={styles.content}>
        <div className={styles.cardsAndChart}>
          <div className={styles.cardsContainer}>
            {ordersData.map((month, index) => (
              <React.Fragment key={month.name}>
                <div className={styles.cardWrapper}>
                  <Card
                    category={month.name}
                    total={month.Atrasados + month.Tempestivos + month.Antecipados}
                  />
                </div>
                {(index + 1) % 3 === 0 && index !== ordersData.length - 1 && (
                  <div className={styles.cardSeparator} />
                )}
              </React.Fragment>
            ))}
          </div>
          <div className={styles.section}>
            <h2>Resumo dos Pedidos</h2>
            <div className={styles.chartContainer}>
              <ResponsiveContainer width="100%" height={400}>
                <AreaChart data={ordersData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Area type="monotone" dataKey="Atrasados" stackId="1" stroke="#e9892f" fill="#e9892f" />
                  <Area type="monotone" dataKey="Tempestivos" stackId="1" stroke="#82ca9d" fill="#82ca9d" />
                  <Area type="monotone" dataKey="Antecipados" stackId="1" stroke="#0a2f2a" fill="#0a2f2a" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
