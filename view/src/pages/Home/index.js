import React from "react";
import styles from './Home.module.css';

import Banner from "../../components/Banner";
import ProductList from "../../components/ProductList";

function Home() {
    return (
        <div className={styles.homepage}>
            <Banner />
            <main>
                <section>
                    <h2>best sellers</h2>
                    <ProductList />
                    <h2>best sellers</h2>   {/* temp */}
                </section>
            </main>
        </div>
    )
};

export default Home;