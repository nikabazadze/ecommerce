import React from "react";
import styles from './Home.module.css';

import Banner from "../../components/Banner";
import ProductList from "../../components/ProductList";
import CategoryList from "../../components/CategoryList";
import ProductFeatures from "../../components/ProductFeatures";

function Home() {
    return (
        <div className={styles.homepage}>
            <Banner />
            <section>
                <h2>best sellers</h2>
                <ProductList position="horizontal"/>
            </section>
            <section className={styles.features}>
                <ProductFeatures 
                    position="left"
                    url="https://vulkit.com/cdn/shop/files/vulkit_wallet_f0cf5b26-cd81-4af1-a59a-8edbfb546bc5_1080x.jpg?v=1679649457"
                    title="Slim, Modern, Secure"
                    description="There is a better way to carry cards and cash. Ditch the bulk of the traditional leather bi-fold and get a slim, RFID blocking wallet that is ready to go wherever you do and stand the test of time."
                />
                <ProductFeatures 
                    position="right"
                    url="https://vulkit.com/cdn/shop/files/commuter-waiting-for-subway_1080x.jpg?v=1639031973"
                    title="About ZiPLiX"
                    description="We believe you should love the products you carry everyday; not only because they look great and work well, but because they actually make your life better.We believe in having less stuff, designed with more care."
                />
            </section>
            <section>
                <h2>shop by category</h2>
                <CategoryList />
            </section>
        </div>
    );
};

export default Home;