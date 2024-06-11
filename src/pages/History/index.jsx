import React, { useEffect, useState } from "react";
import { getAllOrders } from "../../services/ordersAPI.js";
import MenuComponent from "../../Components/Menu/Menu.jsx";
import { Input } from "../../Components/Input";
import history from "../../assets/images/history-icon.svg";

import styles from "./History.module.scss";
import { useUser } from "../../context/UserContext.jsx";

export const History = () => {
  const [orders, setOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter] = useState("");
  const { user } = useUser();

  useEffect(() => {
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
              item.status !== "Pendente"
          );
          setOrders(filteredOrders);
        }
      })
      .catch((error) => {
        console.error("Failed to fetch orders:", error);
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
      order.id_fornecedor.toString().includes(searchTerm) ||
      order.endereco_origem.rua
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      order.endereco_destino.rua
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      order.endereco_origem.estado
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      order.status.toLowerCase().includes(searchTerm.toLowerCase()) ||
      formatDate(order.data_pedido).includes(searchTerm) // Aplicando o formato na busca por data
  );

  return (
    <>
      <div className={styles.container}>
        <MenuComponent pageName={"Histórico"} />
        <div className={styles.content}>
          {orders.length === 0 ? (
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
                            <td>{formatDate(order.data_pedido)}</td>
                            <td>{order.id_fornecedor}</td>
                            <td>
                              {order.endereco_origem.rua},{" "}
                              {order.endereco_origem.numero}
                            </td>
                            <td>
                              {order.endereco_destino.rua},{" "}
                              {order.endereco_destino.numero}
                            </td>
                            <td>{order.endereco_origem.estado}</td>
                            <td>{order.id_empresa_logistica}</td>
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
          )}
        </div>
      </div>
    </>
  );
};
