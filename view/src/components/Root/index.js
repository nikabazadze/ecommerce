import React from "react";
import { Outlet } from "react-router-dom";

import PromoHeader from "../PromoHeader";
import Header from "../Header";
import Footer from "../Footer";

function Root() {
    return (
        <div>
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