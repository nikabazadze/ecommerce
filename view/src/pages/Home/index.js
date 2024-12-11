import React from "react";
import { useSelector } from "react-redux";

import styles from './Home.module.css';
import Banner from "../../components/Banner";
import Carousel from "../../components/Carousel";
import CategoryList from "../../components/CategoryList";
import ProductHighlights from "../../components/ProductHighlights";
import { selectProducts, selectProductsAreLoading, selectProductsHaveError } from "../../store/ProductsSlice";

function Home() { 
    const bestProducts = useSelector(selectProducts).slice(0, 10);

    return (
        <div className={styles.homepage}>
            <Banner />
            <section>
                <Carousel items={bestProducts} title="best sellers" />
            </section>
            <section className={styles.highlights}>
                <ProductHighlights 
                    position="left"
                    url="https://ecomm-project-ziplix.s3.amazonaws.com/homepage-images/highlight1.png"
                    title="Slim, Modern, Secure"
                    description="There is a better way to carry cards and cash. Ditch the bulk of the traditional leather bi-fold and get a slim, RFID blocking wallet that is ready to go wherever you do and stand the test of time."
                />
                <ProductHighlights 
                    position="right"
                    url="https://ecomm-project-ziplix.s3.amazonaws.com/homepage-images/highlight2.jpeg"
                    title="About ZiPLiX"
                    description="We believe you should love the products you carry everyday; not only because they look great and work well, but because they actually make your life better.We believe in having less stuff, designed with more care."
                />
            </section>
            <section>
                <CategoryList />
            </section>
        </div>
    );
};

export default Home;