import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from 'react-router-dom';

import styles from './Header.module.css';
import Search from "../Search";
import Badge from "../Badge";
import Menu from "../Menu/Menu";
import menuIcon from "./icons/menuIcon.svg";
import closeIcon from "./icons/closeIcon.svg";
import cartIcon from "./icons/cartIcon.svg";
import personIcon from "./icons/personIcon.svg";
import { selectIsLoggedIn, selectUser } from "../../store/UserSlice";
import { selectCartTotalItems } from "../../store/CartSlice";

function Header() {
    const [ showMenu, setShowMenu ] = useState(false);
    const isLoggedIn = useSelector(selectIsLoggedIn);
    const user = useSelector(selectUser);
    const cartTotalItems = useSelector(selectCartTotalItems);
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
                <li><Link to="account">
                    <img src={personIcon} alt="Person icon" className={styles.personIcon} />
                    <span>{`Hello, ${isLoggedIn ? user.firstName : "Sign up"}`}</span>
                </Link></li>
                <li>
                    <Link to="cart">
                        <div className={styles.cartIconContainer}>
                            <img src={cartIcon} alt="Cart icon" className={styles.cartIcon} />
                            {cartTotalItems > 0 && <Badge count={cartTotalItems} size={"0.875rem"} fontSize={"0.625rem"} translate={"20"} />}
                        </div>
                        <span>Cart</span>
                    </Link>
                </li>
            </ul>
        );
    };

    return (
        <>
            {/* Header */}
            <div className={styles.outerContainer}>
                <div className={styles.innerContainer}>
                    <div className={styles.menuIconContainer} onClick={() => setShowMenu(!showMenu)} >
                        <img src={showMenu ? closeIcon : menuIcon} className={styles.menuIcon} alt="Dropdown menu icon" />
                    </div>
                    <nav className={styles.leftNav}>{renderLeftNav()}</nav>
                    <span className={styles.logo}><Link to="/">ZiPLiX</Link></span>
                    <nav className={styles.rightNav}>{renderRightNav()}</nav>
                </div>
            </div>

            {/* Menu */}
            <div className={`${styles.menuContainer} ${showMenu ? styles.menuVisible : ''}`} >
                <Menu showMenu={showMenu} setShowMenu={setShowMenu} />
            </div>
        </>
    );
};

export default Header;