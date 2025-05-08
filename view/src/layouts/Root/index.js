import React from "react";
import { Outlet } from "react-router-dom";

import styles from './Root.module.css';
import ScrollToTop from "../../components/ScrollToTop";
import PromoHeader from "../../components/PromoHeader";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

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