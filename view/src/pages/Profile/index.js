import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';

import styles from './Profile.module.css';
import { logout } from "../../API";
import { clearCart } from "../../store/CartSlice";
import { clearUserInfo } from "../../store/UserSlice";

function Profile() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogout = async () => {
        const response = await logout();
        if (response.status === 200) {
            console.log("Successful logout");
            dispatch(clearUserInfo());
            dispatch(clearCart());
            navigate('/');
        }
    };

    return (
        <div className={styles.profile}>
            <div className={styles.logout}>
                <button className={styles.logoutButton} onClick={handleLogout}>Log out</button>
            </div>
        </div>
    );
};

export default Profile;