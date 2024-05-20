import React, { useState, useEffect } from 'react';
import styles from './Dashboard.module.scss'; 
import MenuComponent from '../../Components/Menu/Menu'; 
import Card from '../../Components/Card/Card'; 

function Dashboard() {
  const [ordersData, setOrdersData] = useState([]);
  
  useEffect(() => {
    setOrdersData([
      { category: 'Pendentes', total: 10 },
      { category: 'Aprovados', total: 20 },
      { category: 'Entregues', total: 30 },
    ]);
  }, []);


  const handleViewOrderDetails = (category) => {
    console.log(`Visualizando pedidos da categoria: ${category}`);
  };

  return (
    <div className={styles.container}>
      <MenuComponent pageName="Dashboard" /> 
      <div className={styles.content}>
        {ordersData.map((order) => (
          <div key={order.category} className={styles.section}>
            <h2>{order.category}</h2>
            <div className={styles.cardsContainer}>
              <Card
                category={order.category}
                total={order.total}
                onClick={() => handleViewOrderDetails(order.category)}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
