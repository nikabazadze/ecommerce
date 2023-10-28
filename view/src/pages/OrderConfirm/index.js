import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from 'react-router-dom';

import styles from './OrderConfirm.module.css';
import { clearCart } from "../../store/CartSlice";
import ProductList from "../../components/ProductList";
import OrderListItem from "../../components/OrderListItem";
import { selectProducts } from "../../store/ProductsSlice";
import { selectOrders, selectOrdersAreLoading, selectOrdersHaveError } from "../../store/OrdersSlice";

function OrderConfirm() {
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();
    const orders = useSelector(selectOrders);
    const ordersLoading = useSelector(selectOrdersAreLoading);
    const ordersError = useSelector(selectOrdersHaveError);
    const products = useSelector(selectProducts);

    useEffect(() => {
        // Check if navigated from checkout page
        if (!location.state || !location.state.fromCheckout) {
            navigate('/');
        } else {
            dispatch(clearCart());
        }
    }, [location, navigate, dispatch]);

    if (ordersLoading) {
        return (
            <div>Orders are loading</div>
        );
    };

    if (ordersError) {
        return (
            <div>Orders did not load!</div>
        );
    };
    
    return (
        <div className={styles.mainContainer}>
            <h2>Order has been placed successfully!</h2>
            {(orders && orders.length > 0) && (
                <div className={styles.orderContainer}>
                    <OrderListItem order={orders[0]} />
                </div>
            )}
            <section className={styles.continueShoppingContainer}>
                <h2>Continue Shopping</h2>
                <ProductList position="horizontal" products={products} />
            </section>
        </div>
    );
};

export default OrderConfirm;