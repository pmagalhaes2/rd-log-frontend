import React, { useEffect, useState } from "react";
import { getAllOrders } from "../../services/ordersAPI.js";
import MenuComponent from "../../Components/Menu/Menu.jsx";
import { Input } from "../../Components/Input";
import history from "../../assets/images/history-icon.svg";
import { Loading } from "../../Components/Loading";
import styles from "./History.module.scss";
import { useUser } from "../../context/UserContext.jsx";

export const History = () => {
  const [orders, setOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const { user } = useUser();

  useEffect(() => {
    setLoading(true);
    getAllOrders()
      .then((response) => {
        if (user.role === "admin") {
          const filteredOrders = response.filter(
            (order) => order.status !== "Pendente"
          );
          setOrders(filteredOrders);
        } else {
          const filteredOrders = response.filter(
            (item) =>
              Number(item.id_empresa_logistica) === user.id &&
              item.status !== "Pendente" &&
              item.status !== "Em andamento"
          );
          setOrders(filteredOrders);
        }
      })
      .catch((error) => {
        console.error("Failed to fetch orders:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [user.id, user.role]);
  

  const formatDate = (date) => {
    const formattedDate = new Date(date);
    const day = formattedDate.getDate().toString().padStart(2, "0");
    const month = (formattedDate.getMonth() + 1).toString().padStart(2, "0");
    const year = formattedDate.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const filteredOrders = orders.filter(
    (order) =>
      order.id.toString().includes(searchTerm) ||
      order.supplier_id.toString().includes(searchTerm) ||
      order.origin_address.value
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      order.destination_address.value
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      order.origin_address.state
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      order.status.toLowerCase().includes(searchTerm.toLowerCase()) ||
      formatDate(order.created_at).includes(searchTerm)
  );

  return (
    <>
      <div className={styles.container}>
        <MenuComponent pageName={"Histórico"} />
        <div className={styles.content}>
          {loading ? (
            <Loading />
          ) : (
            orders.length === 0 ? (
              <div className={styles.not_found_container}>
                <h2>Nenhum pedido encontrado</h2>
                <p>
                  Atualmente, não há pedidos registrados no histórico. Quando
                  novos pedidos forem feitos, eles aparecerão aqui.
                </p>
              </div>
            ) : (
              <div className={styles.tableSection}>
                <div className={styles.history_heading}>
                  <span>
                    <img src={history} alt="Ícone de histórico" />
                    <h3>Histórico de Pedidos</h3>
                  </span>
                  <div>
                    <Input
                      searchInput={true}
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      placeholder="Digite o dado do pedido para filtrar"
                      className={styles.searchInput}
                      freeSize={false}
                    />
                  </div>
                </div>
                <div className={styles.tableContainer}>
                  <div className={styles.tableWrapper}>
                    <table className={styles.orderTable}>
                      <thead>
                        <tr>
                          <th>ID</th>
                          <th>Data</th>
                          <th>Fornecedor</th>
                          <th>Origem</th>
                          <th>Destino</th>
                          <th>UF</th>
                          <th>Logística</th>
                          <th>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredOrders.length > 0 ? (
                          filteredOrders.map((order, index) => (
                            <tr key={index}>
                              <td>{order.id}</td>
                              <td>{formatDate(order.created_at)}</td>
                              <td>{order.supplier_id}</td>
                              <td>
                                {order.origin_address.value},{" "}
                                {order.origin_address.number}
                              </td>
                              <td>
                                {order.destination_address.value},{" "}
                                {order.destination_address.number}
                              </td>
                              <td>{order.origin_address.estado}</td>
                              <td>{order.logistic_company_id}</td>
                              <td>{order.status}</td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan="8">
                              Nenhum pedido encontrado com os critérios de busca.
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </>
  );
}