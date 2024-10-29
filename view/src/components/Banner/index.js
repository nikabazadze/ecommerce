import React from "react";
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
                <button className={styles.button}>shop now</button>
            </div>
        </div>
    );
};

export default Banner;