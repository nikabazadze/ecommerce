import React from "react";
import { useState } from "react";
import { Link } from 'react-router-dom';

import styles from './Footer.module.css';
import AlertDialog from "../AlertDialog";
import Newsletter from "../Newsletter";
import Socials from "../Socials";

function Footer() {
    const [ openDialog, setOpenDialog ] = useState(false);

    const supportListItems = ["shipping", "contact us", "returns", "warranty", "FAQs", "privacy policy"];
    const aboutListItems = ["about ZiPLiX", "our blog", "press & media", "careers", "our story", "ZiPLiX patents"];
    const shopListItems = ["premium wallets", "bags", "metal wallets", "cases", "accessories", "shop all"];
    const dialogTitle = "Could not open the page!"
    const dialogContent = "There is no content/page for this list item. This list item is rendered only for visual purposes.";

    function renderList(title, items) {
        return (
            <nav>
                <h4>{title}</h4>
                <ul>
                    {
                        items.map((item, index) => (
                            <li key={index}><Link to={title === "shop" ? "/shop" : "/"} onClick={() => setOpenDialog(title !== "shop")}>{item}</Link></li>
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
            <div className={styles.rightContent}>
                <Newsletter />
                <Socials />
            </div>
            <div className={styles.copyright}>
                <p>&copy; 2023 Ziplix, all rights reserved.</p>
            </div>
            {openDialog && <AlertDialog title={dialogTitle} content={dialogContent} onClose={setOpenDialog} />}
        </div>
    );
};

export default Footer;