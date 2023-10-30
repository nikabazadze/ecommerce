import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from 'react-router-dom';
import styles from "./Shop.module.css";
import ProductList from "../../components/ProductList";
import { clearSearchTerm } from "../../store/SearchSlice";
import { selectProducts } from "../../store/ProductsSlice";

function Shop() {
    const dispatch = useDispatch();
    const location = useLocation();
    const products = useSelector(selectProducts);

    useEffect(() => {
        return () => {
            if (location.pathname !== '/shop') {
                dispatch(clearSearchTerm());
            }
        };
    }, [dispatch, location.pathname]);

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