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
            <div className={styles.title}>
                <h1>&nbsp;&nbsp;best quality<br />pop up wallets</h1>
            </div>
        </div>
    );
};

export default Banner;