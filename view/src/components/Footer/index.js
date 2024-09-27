import React from "react";
import { useState } from "react";
import { Link } from 'react-router-dom';

import styles from './Footer.module.css';
import AlertDialog from "../AlertDialog";
import Newsletter from "../Newsletter";
import Socials from "../Socials";
import BasicAccordion from "../Accordion";

function Footer() {
    const [ openDialog, setOpenDialog ] = useState(false);

    const supportListItems = ["shipping", "contact us", "returns", "warranty", "FAQs", "privacy policy"];
    const aboutListItems = ["about ZiPLiX", "our blog", "press & media", "careers", "our story", "ZiPLiX patents"];
    const shopListItems = ["premium wallets", "bags", "metal wallets", "cases", "accessories", "shop all"];
    const dialogTitle = "Could not open the page!"
    const dialogContent = "There is no content/page for this list item. This list item is rendered only for visual purposes.";

    // Renders each navigation category
    function renderNav(title, items) {
        return (
            <nav>
                <h4>{title}</h4>
                {renderList(title, items)}
            </nav>
        );
    }

    // Renders navigation list
    function renderList(title, items) {
        return (
            <ul>
                {
                    items.map((item, index) => (
                        title === "shop" ? 
                            <li key={index}><Link to="/shop">{item}</Link></li>
                            :
                            <li key={index}><span onClick={() => setOpenDialog(true)}>{item}</span></li>
                    ))
                }
            </ul>
        );
    };

    function getAccordionItems() {
        return [
            {
                id: 1,
                title: <h4>support</h4>,
                content: renderList("support", supportListItems)
            },
            {
                id: 2,
                title: <h4>about</h4>,
                content: renderList("about", aboutListItems)
            },
            {
                id: 3,
                title: <h4>shop</h4>,
                content: renderList("shop", shopListItems)
            }
        ];
    };
    
    return (
        <>
            <div className={styles.outerContainer}>
                <div className={styles.innerContainer}>
                    <div className={styles.mobile}><Socials /></div>
                    <div className={styles.navContainer}>
                        <div className={styles.desktopNav}>
                            {renderNav("support", supportListItems)}
                            {renderNav("about", aboutListItems)}
                            {renderNav("shop", shopListItems)}
                        </div>
                        <div className={`${styles.accordion} ${styles.mobile}`}>
                            <BasicAccordion items={getAccordionItems()} placement={"footer"} />
                        </div>
                    </div>
                    <div className={styles.rightContent}>
                        <Newsletter />
                        <div className={styles.desktop}><Socials /></div>
                    </div>
                    <div className={styles.copyright}>
                        <p>&copy; 2023 Ziplix, all rights reserved.</p>
                    </div>
                </div>
            </div>
            {openDialog && <AlertDialog title={dialogTitle} content={dialogContent} onClose={setOpenDialog} />}
        </>
    );
};

export default Footer;