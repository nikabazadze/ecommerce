import React from "react";
import styles from "./Shop.module.css";
import ProductList from "../../components/ProductList";

function Shop() {
    return (
        <div className={styles.shopPage}>
            <div className={styles.banner}></div>
            <div className={styles.container}>
                <ProductList />
            </div>
        </div>
    );
};

export default Shop;