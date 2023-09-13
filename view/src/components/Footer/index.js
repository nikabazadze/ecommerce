import React from "react";
import { useState } from "react";
import styles from './Footer.module.css';
import AlertDialog from "../AlertDialog";

function Footer() {

    const supportListItems = ["shipping", "contact us", "returns", "warranty", "FAQs", "privacy policy"];
    const aboutListItems = ["about ZiPLiX", "our blog", "press & media", "careers", "our story", "ZiPLiX patents"];
    const shopListItems = ["premium wallets", "bags", "metal wallets", "cases", "accessories", "shop all"];
    
    function renderList(title, items) {
        return (
            <nav>
                <h4>{title}</h4>
                <ul>
                    {
                        items.map((item, index) => (
                            <li key={index}><a>{item}</a></li>
                        ))
                    }
                </ul>
            </nav>
        );
    };
    
    return (
        <div className={styles.footer}>
            <div className={styles.navContainer}>
                {renderList("support", supportListItems)}
                {renderList("about", aboutListItems)}
                {renderList("shop", shopListItems)}
            </div>
        </div>
    );
};

export default Footer;