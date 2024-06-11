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
          { name: 'Edu Transportes LTDA.', Pendentes: 79, Aprovados: 7, Entregues: 3 },
          { name: 'Chiquinho Transportes LTDA.', Pendentes: 8, Aprovados: 10, Entregues: 18 },
          { name: 'The Best Transportes LTDA.', Pendentes: 9, Aprovados: 129, Entregues: 123 },
          { name: 'Theodoro Transportes LTDA.', Pendentes: 11, Aprovados: 63, Entregues: 68 },
          { name: 'Nuno Transportes LTDA.', Pendentes: 51, Aprovados: 16, Entregues: 13 },
          { name: 'Tech Girls Transportes LTDA.', Pendentes: 6, Aprovados: 69, Entregues: 72 },
        ]);
      } else {
        setOrdersData([
          { name: 'Abril', Pendentes: 8, Aprovados: 10, Entregues: 18 },
          { name: 'Maio', Pendentes: 11, Aprovados: 23, Entregues: 30 },
          { name: 'Junho', Pendentes: 6, Aprovados: 68, Entregues: 72 },
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
                    total={month.Pendentes + month.Aprovados + month.Entregues}
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
                  <Area type="monotone" dataKey="Pendentes" stackId="1" stroke="#e9892f" fill="#e9892f" />
                  <Area type="monotone" dataKey="Aprovados" stackId="1" stroke="#82ca9d" fill="#82ca9d" />
                  <Area type="monotone" dataKey="Entregues" stackId="1" stroke="#0a2f2a" fill="#0a2f2a" />
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
