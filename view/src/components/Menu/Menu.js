import React, { useEffect } from "react";
import { Link } from 'react-router-dom';

import styles from './Menu.module.css';
import Socials from "../Socials";
import arrowIcon from "./arrowIcon.svg";

function Menu({showMenu, setShowMenu}) {
    const categories = ["wallets", "cases", "bags", "accessories"];

    // Toggle scrolling when the menu is open/closed
    useEffect(() => {
        if (showMenu) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }

        return () => {
            document.body.style.overflow = '';
        };
    }, [showMenu]);

    function renderCategories() {
        return (
            categories.map((category, index) => {
                return (
                    <li key={index}>
                        <Link to="/shop" onClick={() => setShowMenu(false)} >
                            <div>
                                <span>{category}</span>
                                <img src={arrowIcon} className={styles.arrowIcon} alt="Arrow icon" />
                            </div>
                        </Link>
                    </li>
                );
            })
        );
    };

    return (
        <>
            <div className={styles.mainContainer}>
                <nav>
                    <ul>
                        {renderCategories()}
                        <li><Link to="/shop" onClick={() => setShowMenu(false)} >shop all</Link></li>
                        <li><Link to="/shop" onClick={() => setShowMenu(false)} >our story</Link></li>
                        <li><Link to="/shop" onClick={() => setShowMenu(false)} >blog</Link></li>
                        <li><Link to="/shop" onClick={() => setShowMenu(false)} >support</Link></li>
                    </ul>
                </nav>
                <div className={styles.socialsContainer}><Socials color="black" /></div>
            </div>
            <div className={`${styles.menuOverlay} ${showMenu ? styles.menuVisible : ''}`} onClick={() => setShowMenu(false)}></div>
        </>
    );
};

export default Menu;