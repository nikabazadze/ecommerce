import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from 'react-router-dom';

import styles from './OrderConfirm.module.css';
import { clearCart } from "../../store/CartSlice";
import Carousel from "../../components/Carousel";
import OrderListItem from "../../components/OrderListItem";
import { selectProducts } from "../../store/ProductsSlice";

function OrderConfirm() {
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();
    const order = location.state?.order;
    const products = useSelector(selectProducts);

    useEffect(() => {
        // Check if navigated from checkout page
        if (!location.state || !location.state.fromCheckout) {
            navigate('/');
        } else {
            dispatch(clearCart());
        }
    }, [location, navigate, dispatch]);
    
    return (
        <div className={styles.mainContainer}>
            <h2>Order has been placed successfully!</h2>
            {order && (
                <div className={styles.orderContainer}>
                    <OrderListItem order={order} />
                </div>
            )}
            <section className={styles.continueShoppingContainer}>
                <Carousel items={products} title="Continue Shopping" />
            </section>
        </div>
    );
};

export default OrderConfirm;