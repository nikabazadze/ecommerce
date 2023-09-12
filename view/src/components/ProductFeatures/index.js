import React from "react";
import styles from './ProductFeatures.module.css';

function ProductFeatures() {
    return (
        <div>
            <div className={styles.feature}>
                <div className={styles.imgContainer}>
                    <img src="https://vulkit.com/cdn/shop/files/vulkit_wallet_f0cf5b26-cd81-4af1-a59a-8edbfb546bc5_1080x.jpg?v=1679649457" alt="Several pop up wallets on the table"/>
                </div>
                <div className={styles.featureText}>
                    <h2>Slim, Modern, Secure</h2>
                    <p>There is a better way to carry cards and cash. Ditch the bulk of the traditional leather bi-fold and get a slim, RFID blocking wallet that is ready to go wherever you do and stand the test of time.</p>
                </div>
            </div>
            <div className={styles.feature}>
                <div className={styles.imgContainer}>
                    <img src="https://vulkit.com/cdn/shop/files/commuter-waiting-for-subway_1080x.jpg?v=1639031973" alt="Men waiting in the subway for coming train"/>
                </div>
                <div className={styles.featureText}>
                    <h2>About ZiPLiX</h2>
                    <p>We believe you should love the products you carry everyday; not only because they look great and work well, but because they actually make your life better.We believe in having less stuff, designed with more care.</p>
                </div>
            </div>
        </div>
    );
};

export default ProductFeatures;