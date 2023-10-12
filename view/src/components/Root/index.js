import React from "react";
import { Outlet } from "react-router-dom";

import styles from './Root.module.css';
import ScrollToTop from "../ScrollToTop";
import PromoHeader from "../PromoHeader";
import Header from "../Header";
import Footer from "../Footer";

function Root() {
    return (
        <div className={styles.flexContainer}>
            <ScrollToTop />
            <header>
                <PromoHeader />
                <Header />
            </header>
            <main className={styles.flexGrow}>
                <Outlet />
            </main>
            <footer>
                <Footer />
            </footer>
        </div>
    );
};

export default Root;