import React, { useEffect } from "react";
import { Link } from 'react-router-dom';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

import styles from './Menu.module.css';
import Socials from "../Socials";

function Menu({showMenu, setShowMenu}) {

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

    return (
        <>
            <div className={styles.mainContainer}>
                <nav>
                    <ul>
                        <li><Link to="/shop" onClick={() => setShowMenu(false)} >
                            <div>
                                <span>wallets</span>
                                <ArrowForwardIosIcon className={styles.arrowIcon}/>
                            </div>
                        </Link></li>
                        <li><Link to="/shop" onClick={() => setShowMenu(false)} >
                            <div>
                                <span>cases</span>
                                <ArrowForwardIosIcon className={styles.arrowIcon}/>
                            </div>
                        </Link></li>
                        <li><Link to="/shop" onClick={() => setShowMenu(false)} >
                            <div>
                                <span>bags</span>
                                <ArrowForwardIosIcon className={styles.arrowIcon}/>
                            </div>
                        </Link></li>
                        <li><Link to="/shop" onClick={() => setShowMenu(false)} >
                            <div>
                                <span>accessories</span>
                                <ArrowForwardIosIcon className={styles.arrowIcon}/>
                            </div>
                        </Link></li>
                        <li><Link to="/shop" onClick={() => setShowMenu(false)} >shop all</Link></li>
                        <li><Link to="/shop" onClick={() => setShowMenu(false)} >our story</Link></li>
                        <li><Link to="/shop" onClick={() => setShowMenu(false)} >blog</Link></li>
                        <li><Link to="/shop" onClick={() => setShowMenu(false)} >support</Link></li>
                    </ul>
                </nav>
                <Socials />
            </div>
            <div className={`${styles.menuOverlay} ${showMenu ? styles.menuVisible : ''}`} onClick={() => setShowMenu(false)}></div>
        </>
    )
}

export default Menu;