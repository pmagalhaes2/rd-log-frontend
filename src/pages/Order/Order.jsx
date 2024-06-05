import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import styles from './Order.module.scss';
import MenuComponent from '../../Components/Menu/Menu';
import { useUser } from '../../context/UserContext';
import { Input } from '../../Components/Input';
import { Button } from '../../Components/Button';

const Order = () => {
    const [orders, setOrders] = useState([
        { id: 1, date: '2024-05-20', volume: 10, status: 'Em andamento', type: 'logistica', solicitante: 'Cliente A', destinatario: 'Destinatário A', empresa: 'Empresa A', entregador: 'Entregador A' },
        { id: 2, date: '2024-05-21', volume: 15, status: 'Entregue', type: 'cliente', solicitante: 'Cliente B', destinatario: 'Destinatário B', empresa: 'Empresa B', entregador: 'Entregador B' },
        { id: 3, date: '2024-05-22', volume: 8, status: 'Pendente', type: 'logistica', solicitante: 'Cliente C', destinatario: 'Destinatário C', empresa: 'Empresa C', entregador: 'Entregador C' },
        { id: 4, date: '2024-05-23', volume: 12, status: 'Em andamento', type: 'cliente', solicitante: 'Cliente D', destinatario: 'Destinatário D', empresa: 'Empresa D', entregador: 'Entregador D' },
    ]);

    const { user } = useUser();
    const [filter, setFilter] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [orderBy, setOrderBy] = useState('');
    const [disabledButtons, setDisabledButtons] = useState({}); 

    const navigate = useNavigate();  

    useEffect(() => {
        setOrders([
            { id: 1, date: '2024-05-20',  status: 'Em andamento', type: 'logistica', solicitante: 'Cliente A', destinatario: 'Destinatário A', empresa: 'Empresa A', entregador: 'Entregador A' },
            { id: 2, date: '2024-05-21',  status: 'Entregue', type: 'cliente', solicitante: 'Cliente B', destinatario: 'Destinatário B', empresa: 'Empresa B', entregador: 'Entregador B' },
            { id: 3, date: '2024-05-22',  status: 'Pendente', type: 'logistica', solicitante: 'Cliente C', destinatario: 'Destinatário C', empresa: 'Empresa C', entregador: 'Entregador C' },
            { id: 4, date: '2024-05-23',  status: 'Em andamento', type: 'cliente', solicitante: 'Cliente D', destinatario: 'Destinatário D', empresa: 'Empresa D', entregador: 'Entregador D' },
        ]);
    }, []);

    const handleCheckout = (order) => {
        const { id, date, volume, type, solicitante, destinatario } = order;
        navigate('/requests', {
            state: { id, date, volume, type, solicitante, destinatario }
        }); 
    };

    const handleStatusChange = (orderId, newStatus) => {
        setOrders(prevOrders =>
            prevOrders.map(order =>
                order.id === orderId ? { ...order, status: newStatus } : order
            )
        );
        setDisabledButtons(prevState => ({
            ...prevState,
            [orderId]: true
        }));
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
                                        <th>Data do Pedido</th>
                                        <th>Status</th>
                                        <th>Solicitante</th>
                                        <th>Destinatário</th>
                                        <th>Empresa</th>
                                        <th>Entregador</th>
                                        <th>Ações</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredOrders('logistica').map((order) => (
                                        <tr key={order.id}>
                                            <td>{order.id}</td>
                                            <td>{order.date}</td>
                                            <td>{order.status}</td>
                                            <td>{order.solicitante}</td>
                                            <td>{order.destinatario}</td>
                                            <td>{order.empresa}</td>
                                            <td>{order.entregador}</td>
                                            <td>
                                                {user && user.role === 'user' ? ( 
                                                    <div className={styles.buttonGroup}>
                                                        <button 
                                                            title='Aceitar' 
                                                            className={styles.green} 
                                                            onClick={() => handleStatusChange(order.id, 'Aceito')}
                                                            disabled={disabledButtons[order.id]}
                                                        >
                                                            Aceitar
                                                        </button>
                                                        <button 
                                                            title='Recusar' 
                                                            className={styles.orange} 
                                                            onClick={() => handleStatusChange(order.id, 'Recusado')}
                                                            disabled={disabledButtons[order.id]}
                                                        >
                                                            Recusar
                                                        </button>
                                                    </div>
                                                ) : (
                                                    <Button title='Solicitar' onClick={() => handleCheckout(order.id)}>Solicitar Envio</Button>
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
