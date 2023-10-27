import React from "react";
import { useSelector } from "react-redux";
import styles from './OrderList.module.css';
import OrderListItem from "../OrderListItem";
import { selectOrders } from "../../store/OrdersSlice";

function OrderList({ limit }) {
    const orders = useSelector(selectOrders);

    return (
        <div className={styles.mainContainer}>
            {orders.length > 0 && orders.map((order, index) => (
                (!limit || ((index + 1) <= limit)) && <OrderListItem key={order.orderId} order={order} />
            ))}
        </div>
    );
}

export default OrderList;