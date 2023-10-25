import React from "react";
import styles from './OrderList.module.css';
import OrderListItem from "../OrderListItem";

function OrderList() {
    return (
        <div className={styles.mainContainer}>
            <OrderListItem />
        </div>
    );
}

export default OrderList;