import React from "react";
import styles from './Home.module.css';

import Banner from "../../components/Banner";
import ProductList from "../../components/ProductList";

function Home() {
    return (
        <div className={styles.homepage}>
            <Banner />
            <section>
                <h2>best sellers</h2>
                <ProductList />
            </section>
            <section>
                <h2>shop by category</h2>
            </section>
        </div>
    )
};

export default Home;