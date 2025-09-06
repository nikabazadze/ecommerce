import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';

import styles from './Profile.module.css';
import { logout } from "../../API";
import { selectOrders } from "../../store/OrdersSlice";
import { clearCart } from "../../store/CartSlice";
import { clearOrders } from "../../store/OrdersSlice";
import { clearUserInfo } from "../../store/UserSlice";
import OrderList from "../../components/OrderList";

function Profile() {
    const [ showMoreOrders, setShowMoreOrders ] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
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
            <div>
                {/* Orders Section */}
                <section className={styles.ordersContainer}>
                    <h2>Orders</h2>
                    {orders.length > 0 && <div className={styles.orderListContainer}><OrderList limit={showMoreOrders ? 10 : 1} /></div>}
                    {orders.length > 1 && 
                        <button onClick={() => setShowMoreOrders((prev) => !prev)} className={styles.button}>
                            {showMoreOrders ? "See less orders" : "See more orders"}
                        </button>
                    }

                    {/* No orders */}
                    {orders.length === 0 && 
                        <div className={styles.noOrdersContainer}>
                            <span>No orders yet</span>
                            <p>Go to store to place an order.</p>
                        </div>
                    }
                </section>

                {/* Logout Button */}
                <button onClick={handleLogout} className={`${styles.button} ${styles.logout}`}>Logout</button>
            </div>
        </div>
    );
};

export default Profile;