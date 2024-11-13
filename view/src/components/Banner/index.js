import React from "react";
import { Link } from 'react-router-dom';
import styles from './Banner.module.css';

function Banner() {
    return (
        <div className={styles.container}>
            <div className={styles.banner1}>
                <div className={styles.overlay}></div>
            </div>
            <div className={styles.banner2}>
                <div className={styles.overlay}></div>
            </div>
            <div className={styles.contentContainer}>
                <h1 className={styles.h1}>best quality<br />pop up wallets</h1>
                <Link to={"/shop"} ><button className={styles.button}>shop now</button></Link>
            </div>
        </div>
    );
};

export default Banner;