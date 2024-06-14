import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Order.module.scss";
import MenuComponent from "../../Components/Menu/Menu";
import { getAllOrders, updateOrder} from "../../services/ordersAPI.js";
import { useUser } from "../../context/UserContext";
import { Input } from "../../Components/Input";
import { Button } from "../../Components/Button";
import { Icon } from "@iconify/react/dist/iconify";
import acceptIcon from "@iconify-icons/mdi/check-thick";
import rejectIcon from "@iconify-icons/mdi/close-thick";
import truck from "../../assets/images/Truck.png";

const Order = () => {
  const [orders, setOrders] = useState([]);
  const { user } = useUser();
  const [filter] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [disabledButtons, setDisabledButtons] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    getAllOrders()
      .then((response) => {
        let filteredOrders = [];
        if (user.role === "admin") {
          filteredOrders = response.filter(
            (order) => order.status === "Pendente"
          );
        } else {
          filteredOrders = response.filter(
            (item) =>
              Number(item.id_empresa_logistica) === user.id &&
            (item.status === "Pendente" 
              || item.status === "Em andamento")  

          );
        }
        setOrders(filteredOrders);
      })
      .catch((error) => {
        console.error("Failed to fetch orders:", error);
      });
  }, [user.id, user.role]);

  const handleCheckout = (order) => {
    navigate(`/requests/${order.id}`, {
      state: {
        origin_cep: order.endereco_origem.cep,
        origin_street: order.endereco_origem.rua,
        destination_cep: order.endereco_destino.cep,
        destination_street: order.endereco_destino.rua,
      },
    });
  };

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.id === orderId ? { ...order, status: newStatus } : order
        )
      );

      if (newStatus === "Recusado") {
        newStatus = "Pendente" ;
      }

      await updateOrder(orderId, 0,  newStatus);

      setDisabledButtons((prevState) => ({
        ...prevState,
        [orderId]: true,
      }));
    } catch (error) {
      console.error("Failed to update order status:", error);
    }
  };

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
      formatDate(order.data_pedido).includes(searchTerm)
  );

  return (
    <div className={styles.container}>
      <MenuComponent pageName={"Pedidos"} />

      <div className={styles.content}>
        {filter === "logistica" || filter === "" ? (
          <div className={styles.tableSection}>
            <div className={styles.orders_heading}>
              <span>
                <img src={truck} alt="Ícone de pedidos" />
                <h3>Listagem de Pedidos</h3>
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
                      <th>Origem</th>
                      <th>Destino</th>
                      <th>UF</th>
                      <th>Status</th>
                      <th>Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredOrders.length > 0 ? (
                      filteredOrders.map((order) => (
                        <tr key={order.id}>
                          <td>{order.id}</td>
                          <td>{formatDate(order.data_pedido)}</td>
                          <td>
                            {order.endereco_origem.rua},{" "}
                            {order.endereco_origem.numero}
                          </td>
                          <td>
                            {order.endereco_destino.rua},{" "}
                            {order.endereco_destino.numero}
                          </td>
                          <td>{order.endereco_origem.estado}</td>
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
                                onClick={() => handleCheckout(order)}
                              >
                                Solicitar Envio
                              </Button>
                            )}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="6">
                          Nenhum pedido encontrado com os critérios de busca.
                        </td>
                      </tr>
                    )}
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




