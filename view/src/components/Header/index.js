import React from "react";
import { useSelector } from "react-redux";
import { Link } from 'react-router-dom';

import styles from './Header.module.css';
import Search from "../Search";
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import { selectIsLoggedIn, selectUser } from "../../store/UserSlice";

function Header() {
    const isLoggedIn = useSelector(selectIsLoggedIn);
    const user = useSelector(selectUser);
    const categories = ["wallets", "cases", "bags", "accessories"];

    function renderLeftNav() {
        return (
            <ul className={styles.list}>
                {categories.map((category, index) => {
                    return <li key={index}><Link to="/shop">{category}</Link></li>;
                })}
            </ul>
        );
    };

    function renderRightNav() {
        return (
            <ul className={styles.list}>
                <li><Search /></li>
                <li><Link to="account"><PersonOutlinedIcon /><span>{`Hello, ${isLoggedIn ? user.firstName : "Sign up"}`}</span></Link></li>
                <li><Link to="cart"><ShoppingCartOutlinedIcon sx={{fontSize: 22}} /><span>Cart</span></Link></li>
            </ul>
        );
    };

    return (
        <div className={styles.container}>
            <nav className={styles.leftNav}>{renderLeftNav()}</nav>
            <span className={styles.logo}><Link to="/">ZiPLiX</Link></span>
            <nav className={styles.rightNav}>{renderRightNav()}</nav>
        </div>
    );
};

export default Header;