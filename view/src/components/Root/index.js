import React from "react";
import { Outlet } from "react-router-dom";

import ScrollToTop from "../ScrollToTop";
import PromoHeader from "../PromoHeader";
import Header from "../Header";
import Footer from "../Footer";

function Root() {
    return (
        <div>
            <ScrollToTop />
            <header>
                <PromoHeader />
                <Header />
            </header>
            <main>
                <Outlet />
            </main>
            <footer>
                <Footer />
            </footer>
        </div>
    );
};

export default Root;