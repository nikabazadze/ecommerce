import React from "react";

import styles from './Header.module.css';
import Search from "../Search";
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';

function Header() {
    const categories = ["wallets", "cases", "bags", "accessories"];

    function renderLeftNav() {
        return (
            <ul className={styles.list}>
                {categories.map((category, index) => {
                    return <li key={index}><a href="#">{category}</a></li>;
                })}
            </ul>
        );
    };

    function renderRightNav() {
        return (
            <ul className={styles.list}>
                <li><Search /></li>
                <li><a href="#" className={styles.temp}><PersonOutlinedIcon /><span>Hello, Sign in</span></a></li>
                <li><a href="#"><ShoppingCartOutlinedIcon sx={{fontSize: 22}} /><span>Cart</span></a></li>
            </ul>
        );
    };

    return (
        <div className={styles.container}>
            <nav className={styles.leftNav}>{renderLeftNav()}</nav>
            <span className={styles.logo}>ZiPLiX</span>
            <nav className={styles.rightNav}>{renderRightNav()}</nav>
        </div>
    );
};

export default Header;