import React from "react";
import { Link } from 'react-router-dom';

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
                    return <li key={index} onClick={() => window.scrollTo(0, 0)}><Link to="/shop">{category}</Link></li>;
                })}
            </ul>
        );
    };

    function renderRightNav() {
        return (
            <ul className={styles.list}>
                <li><Search /></li>
                <li><Link to="/"><PersonOutlinedIcon /><span>Hello, Sign in</span></Link></li>
                <li><Link to="/"><ShoppingCartOutlinedIcon sx={{fontSize: 22}} /><span>Cart</span></Link></li>
            </ul>
        );
    };

    return (
        <div className={styles.container}>
            <nav className={styles.leftNav}>{renderLeftNav()}</nav>
            <span className={styles.logo}><Link to="/" onClick={() => window.scrollTo(0, 0)}>ZiPLiX</Link></span>
            <nav className={styles.rightNav}>{renderRightNav()}</nav>
        </div>
    );
};

export default Header;