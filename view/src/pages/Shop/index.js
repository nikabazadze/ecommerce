import React from "react";
import { useSelector } from "react-redux";
import styles from "./Shop.module.css";
import ProductList from "../../components/ProductList";
import { selectProducts } from "../../store/ProductsSlice";

function Shop() {
    const products = useSelector(selectProducts);

    return (
        <div className={styles.shopPage}>
            <div className={styles.banner}></div>
            <div className={styles.container}>
                <ProductList products={products} />
            </div>
        </div>
    );
};

export default Shop;