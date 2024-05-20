import React, { useState, useEffect } from 'react';
import styles from './Order.module.scss';
import MenuComponent from '../../Components/Menu/Menu';
import { Input } from '../../Components/Input';
import { Button } from '../../Components/Button';

const Order = () => {
    const [orders, setOrders] = useState([
        { id: 1, date: '2024-05-20', volume: 10, route: 'Rota A', status: 'Em andamento', type: 'logistica', solicitante: 'Cliente A', destinatario: 'Destinatário A', empresa: 'Empresa A', entregador: 'Entregador A' },
        { id: 2, date: '2024-05-21', volume: 15, route: 'Rota B', status: 'Entregue', type: 'cliente', solicitante: 'Cliente B', destinatario: 'Destinatário B', empresa: 'Empresa B', entregador: 'Entregador B' },
        { id: 3, date: '2024-05-22', volume: 8, route: 'Rota C', status: 'Pendente', type: 'logistica', solicitante: 'Cliente C', destinatario: 'Destinatário C', empresa: 'Empresa C', entregador: 'Entregador C' },
        { id: 4, date: '2024-05-23', volume: 12, route: 'Rota D', status: 'Em andamento', type: 'cliente', solicitante: 'Cliente D', destinatario: 'Destinatário D', empresa: 'Empresa D', entregador: 'Entregador D' },
    ]);

    const [filter, setFilter] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [orderBy, setOrderBy] = useState('');

    useEffect(() => {
        setOrders([
            { id: 1, date: '2024-05-20', volume: 10, route: 'Rota A', status: 'Em andamento', type: 'logistica', solicitante: 'Cliente A', destinatario: 'Destinatário A', empresa: 'Empresa A', entregador: 'Entregador A' },
            { id: 2, date: '2024-05-21', volume: 15, route: 'Rota B', status: 'Entregue', type: 'cliente', solicitante: 'Cliente B', destinatario: 'Destinatário B', empresa: 'Empresa B', entregador: 'Entregador B' },
            { id: 3, date: '2024-05-22', volume: 8, route: 'Rota C', status: 'Pendente', type: 'logistica', solicitante: 'Cliente C', destinatario: 'Destinatário C', empresa: 'Empresa C', entregador: 'Entregador C' },
            { id: 4, date: '2024-05-23', volume: 12, route: 'Rota D', status: 'Em andamento', type: 'cliente', solicitante: 'Cliente D', destinatario: 'Destinatário D', empresa: 'Empresa D', entregador: 'Entregador D' },
        ]);
    }, []);

    const handleCheckout = (orderId) => {
        console.log(`Pedido ${orderId} enviado para checkout.`);
    };

    const handleStatusChange = (orderId, newStatus) => {
        setOrders(prevOrders =>
            prevOrders.map(order =>
                order.id === orderId ? { ...order, status: newStatus } : order
            )
        );
    };

    const handleSort = (key) => {
        const sortedOrders = [...orders].sort((a, b) => {
            if (a[key] < b[key]) return -1;
            if (a[key] > b[key]) return 1;
            return 0;
        });
        setOrders(sortedOrders);
        setOrderBy(key);
    };

    const filteredOrders = (type) => {
        return orders.filter((order) => order.type === type)
            .filter((order) => {
                if (!searchTerm) return true;
                return (
                    order.id.toString().includes(searchTerm) ||
                    order.date.includes(searchTerm) ||
                    order.route.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    order.status.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    order.solicitante.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    order.destinatario.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    order.empresa.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    order.entregador.toLowerCase().includes(searchTerm.toLowerCase())
                );
            });
    };

    return (
        <div className={styles.orderContainer}>
            <MenuComponent className={styles.menu} />

            <div className={styles.content}>
                <select className={styles.filterSelect} value={filter} onChange={(e) => setFilter(e.target.value)}>
                    <option value="">Todos</option>
                    <option value="logistica">Logística</option>
                    <option value="cliente">Cliente</option>
                </select>

                <Input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Buscar por ID, data, rota, status, solicitante, destinatário, empresa ou entregador"
                    className={styles.searchInput}
                />

                

                {filter === 'logistica' || filter === '' ? (
                    <div className={styles.tableSection}>
                        <h2>Listagem de Pedidos em Andamento (Logística)</h2>
                        <div className={styles.tableContainer}>
                         <div className={styles.tableWrapper}>
                            <table className={styles.orderTable}>
                                <thead>
                                    <tr>
                                        <th>Ordem ID</th>
                                        <th>Data</th>
                                        <th>Volume</th>
                                        <th>Rota</th>
                                        <th>Status</th>
                                        <th>Solicitante</th>
                                        <th>Destinatário</th>
                                        <th>Empresa</th>
                                        <th>Entregador</th>
                                        <th>Alterar Status</th>
                                        <th>Solicitar envio</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredOrders('logistica').map((order) => (
                                        <tr key={order.id}>
                                            <td>{order.id}</td>
                                            <td>{order.date}</td>
                                            <td>{order.volume}</td>
                                            <td>{order.route}</td>
                                            <td>{order.status}</td>
                                            <td>{order.solicitante}</td>
                                            <td>{order.destinatario}</td>
                                            <td>{order.empresa}</td>
                                            <td>{order.entregador}</td>
                                            <td>
                                                <select
                                                    value={order.status}
                                                    onChange={(e) => handleStatusChange(order.id, e.target.value)}
                                                >
                                                    <option value="Em andamento">Em andamento</option>
                                                    <option value="Entregue">Entregue</option>
                                                    <option value="Pendente">Pendente</option>
                                                </select>
                                            </td>
                                            <td>
                                                <Button title='Solicitar' onClick={() => handleCheckout(order.id)}>Novo Nome do Botão</Button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        </div>
                    </div>
                ) : null}

                {filter === 'cliente' || filter === '' ? (
                    <div className={styles.tableSection}>
                        <h2>Listagem de Pedidos em Andamento (Cliente)</h2>
                        <div className={styles.tableContainer}>
                        <div className={styles.tableWrapper}>
                            <table className={styles.orderTable}>
                                <thead>
                                    <tr>
                                        <th>Ordem ID</th>
                                        <th>Data</th>
                                        <th>Volume</th>
                                        <th>Rota</th>
                                        <th>Status</th>
                                        <th>Solicitante</th>
                                        <th>Destinatário</th>
                                        <th>Empresa</th>
                                        <th>Entregador</th>
                                        <th>Alterar Status</th>
                                        <th>Solicitar envio</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredOrders('cliente').map((order) => (
                                        <tr key={order.id}>
                                            <td>{order.id}</td>
                                            <td>{order.date}</td>
                                            <td>{order.volume}</td>
                                            <td>{order.route}</td>
                                            <td>{order.status}</td>
                                            <td>{order.solicitante}</td>
                                            <td>{order.destinatario}</td>
                                            <td>{order.empresa}</td>
                                            <td>{order.entregador}</td>
                                            <td>
                                                <select
                                                    value={order.status}
                                                    onChange={(e) => handleStatusChange(order.id, e.target.value)}
                                                >
                                                    <option value="Em andamento">Em andamento</option>
                                                    <option value="Entregue">Entregue</option>
                                                    <option value="Pendente">Pendente</option>
                                                </select>
                                            </td>
                                            <td>
                                                <Button title='Solicitar' onClick={() => handleCheckout(order.id)}>Solicitar Envio</Button>
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
