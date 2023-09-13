import React from "react";
import styles from './Footer.module.css';

function Footer() {
    function renderSupportList() {
        return (
            <div>
                <h4>support</h4>
                <ul>
                    <li><a>shipping</a></li>
                    <li><a>contact us</a></li>
                    <li><a>returns</a></li>
                    <li><a>warranty</a></li>
                    <li><a>FAQs</a></li>
                    <li><a>privacy policy</a></li>
                </ul>
            </div>
        );
    };

    function renderAboutList() {
        return (
            <div>
                <h4>about</h4>
                <ul>
                    <li><a>about ZiPLiX</a></li>
                    <li><a>our blog</a></li>
                    <li><a>press & media</a></li>
                    <li><a>careers</a></li>
                    <li><a>our story</a></li>
                    <li><a>ZiPLiX patents</a></li>
                </ul>
            </div>
        );
    };

    function renderShopList() {
        return (
            <div>
                <h4>shop</h4>
                <ul>
                    <li><a>premium wallets</a></li>
                    <li><a>bags</a></li>
                    <li><a>metal wallets</a></li>
                    <li><a>cases</a></li>
                    <li><a>accessories</a></li>
                    <li><a>shop all</a></li>
                </ul>
            </div>
        );
    };

    function renderSubscription() {
        return (
            <ul>
                <li><a>premium wallets</a></li>
                <li><a>bags</a></li>
                <li><a>metal wallets</a></li>
                <li><a>cases</a></li>
                <li><a>accessories</a></li>
                <li><a>shop all</a></li>
            </ul>
        );
    };

    return (
        <div className={styles.footer}>
            <div className={styles.contentContainer}>
                {renderSupportList()}
                {renderAboutList()}
                {renderShopList()}
            </div>
        </div>
    );
};

export default Footer;