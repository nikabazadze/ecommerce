import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from 'react-router-dom';
import styles from "./Shop.module.css";
import ProductList from "../../components/ProductList";
import { selectProducts } from "../../store/ProductsSlice";

function Shop() {
    const dispatch = useDispatch();
    const location = useLocation();
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