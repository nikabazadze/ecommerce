import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';

import styles from './Profile.module.css';
import { logout } from "../../API";
import { selectUser } from "../../store/UserSlice";
import { selectOrders } from "../../store/OrdersSlice";
import { clearCart } from "../../store/CartSlice";
import { clearOrders } from "../../store/OrdersSlice";
import { clearUserInfo } from "../../store/UserSlice";
import AlertDialog from "../../components/AlertDialog";
import OrderList from "../../components/OrderList";

function Profile() {
    const [ openDialog, setOpenDialog ] = useState(false);
    const [ showMoreOrders, setShowMoreOrders ] = useState(false);
    const dialogContent = "This functionality has not been implemented yet!";
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector(selectUser);
    const orders = useSelector(selectOrders);

    const handleLogout = async () => {
        const response = await logout();
        if (response.status === 200) {
            console.log("Successful logout");
            dispatch(clearUserInfo());
            dispatch(clearCart());
            dispatch(clearOrders());
            navigate('/');
        }
    };

    return (
        <div className={styles.profilePage}>
            <div className={styles.logout}>
                <p onClick={handleLogout}>Logout</p>
            </div>
            <section className={styles.accountContainer}>
                <h2>My Account</h2>
                <p>{`Welcome back, ${user.firstName}!`}</p>
            </section>
            <div className={styles.profileFooter}>
                <section className={styles.ordersContainer}>
                    <h3>My Orders</h3>
                    <hr />
                    {orders.length > 0 && <OrderList limit={showMoreOrders ? 10 : 1} />}
                    {orders.length > 1 && <span onClick={() => setShowMoreOrders((prev) => !prev)}>{showMoreOrders ? "See less" : "See more"}</span>}
                    {orders.length === 0 && <p>You haven't placed any orders yet.</p>}
                </section>
                <section className={styles.addressContainer}>
                    <h3>Primary Address</h3>
                    <hr />
                    <div className={styles.addressInfo}>
                        <p>{`${user.firstName} ${user.lastName}`}</p>
                        <p>USA</p>
                    </div>
                    <button className={styles.addressButton} onClick={() => setOpenDialog(true)}>Edit Address</button>
                    {openDialog && <AlertDialog content={dialogContent} onClose={setOpenDialog} />}
                </section>
            </div>
        </div>
    );
};

export default Profile;