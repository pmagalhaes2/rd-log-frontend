import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Order.module.scss";
import MenuComponent from "../../Components/Menu/Menu";
import { useUser } from "../../context/UserContext";
import { Input } from "../../Components/Input";
import { Button } from "../../Components/Button";
import { Icon } from "@iconify/react/dist/iconify";
import acceptIcon from "@iconify-icons/mdi/check-thick";
import rejectIcon from "@iconify-icons/mdi/close-thick";

const Order = () => {
  const [orders, setOrders] = useState([
    {
      id: 1,
      date: "2024-05-20",
      volume: 10,
      status: "Em andamento",
      type: "logistica",
      solicitante: "Cliente A",
      destinatario: "Destinatário A",
    },
    {
      id: 2,
      date: "2024-05-21",
      volume: 15,
      status: "Entregue",
      type: "cliente",
      solicitante: "Cliente B",
      destinatario: "Destinatário B",
    },
    {
      id: 3,
      date: "2024-05-22",
      volume: 8,
      status: "Pendente",
      type: "logistica",
      solicitante: "Cliente C",
      destinatario: "Destinatário C",
    },
    {
      id: 4,
      date: "2024-05-23",
      volume: 12,
      status: "Em andamento",
      type: "cliente",
      solicitante: "Cliente D",
      destinatario: "Destinatário D",
    },
  ]);

  const { user } = useUser();
  const [filter] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [disabledButtons, setDisabledButtons] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    setOrders([
      {
        id: 1,
        date: "2024-05-20",
        status: "Em andamento",
        type: "logistica",
        solicitante: "Cliente A",
        destinatario: "Destinatário A",
      },
      {
        id: 2,
        date: "2024-05-21",
        status: "Entregue",
        type: "cliente",
        solicitante: "Cliente B",
        destinatario: "Destinatário B",
      },
      {
        id: 3,
        date: "2024-05-22",
        status: "Pendente",
        type: "logistica",
        solicitante: "Cliente C",
        destinatario: "Destinatário C",
      },
      {
        id: 4,
        date: "2024-05-23",
        status: "Em andamento",
        type: "cliente",
        solicitante: "Cliente D",
        destinatario: "Destinatário D",
      },
    ]);
  }, []);

  const handleCheckout = (order) => {
    const { id, date, volume, type, solicitante, destinatario } = order;
    navigate("/requests", {
      state: { id, date, volume, type, solicitante, destinatario },
    });
  };

  const handleStatusChange = (orderId, newStatus) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    );
    setDisabledButtons((prevState) => ({
      ...prevState,
      [orderId]: true,
    }));
  };

  const filteredOrders = (type) => {
    return orders
      .filter((order) => order.type === type)
      .filter((order) => {
        if (!searchTerm) return true;
        return (
          order.id.toString().includes(searchTerm) ||
          order.date.includes(searchTerm) ||
          order.status.toLowerCase().includes(searchTerm.toLowerCase()) ||
          order.solicitante.toLowerCase().includes(searchTerm.toLowerCase()) ||
          order.destinatario.toLowerCase().includes(searchTerm.toLowerCase())
        );
      });
  };

  return (
    <div className={styles.container}>
      <MenuComponent pageName={"Pedidos"} />

      <div className={styles.content}>
        {filter === "logistica" || filter === "" ? (
          <div className={styles.tableSection}>
            <h2>Listagem de Pedidos</h2>
            <Input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Digite o dado do pedido para efetuar busca"
              className={styles.searchInput}
            />
            <div className={styles.tableContainer}>
              <div className={styles.tableWrapper}>
                <table className={styles.orderTable}>
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Data Pedido</th>
                      <th>Origem</th>
                      <th>Destino</th>
                      <th>Status</th>
                      <th>Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredOrders("logistica").map((order) => (
                      <tr key={order.id}>
                        <td>{order.id}</td>
                        <td>{order.date}</td>
                        <td>{order.solicitante}</td>
                        <td>{order.destinatario}</td>
                        <td>{order.status}</td>

                        <td>
                          {user && user.role === "user" ? (
                            <div className={styles.buttonGroup}>
                              <button
                                title="Aceitar"
                                className={styles.green}
                                onClick={() =>
                                  handleStatusChange(order.id, "Aceito")
                                }
                                disabled={disabledButtons[order.id]}
                              >
                                <Icon icon={acceptIcon} />
                              </button>
                              <button
                                title="Recusar"
                                className={styles.orange}
                                onClick={() =>
                                  handleStatusChange(order.id, "Recusado")
                                }
                                disabled={disabledButtons[order.id]}
                              >
                                <Icon icon={rejectIcon} />
                              </button>
                            </div>
                          ) : (
                            <Button
                              title="Solicitar"
                              onClick={() => handleCheckout(order.id)}
                            >
                              Solicitar Envio
                            </Button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Order;
