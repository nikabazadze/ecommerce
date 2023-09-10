import React from "react";
import styles from './Banner.module.css';

import banner1 from '../../assets/images/banner1.jpg';
import banner2 from '../../assets/images/banner2.png';

function Banner() {
    return (
        <section className={styles.banner}>
            <div className={styles.imgContainer}>
                <img src={banner1} alt="Several wallets on the table along with laptop"/>
            </div>
            <div className={styles.imgContainer}>
                <img src={banner2} alt="holding pop up wallet in the hand"/>
            </div>
            <div className={styles.overlay}>
                <h2>&nbsp;&nbsp; best quality</h2>
                <h2>&nbsp;&nbsp;pop up wallets</h2>
            </div>
        </section>
    );
};

export default Banner;