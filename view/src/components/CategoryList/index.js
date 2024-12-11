import React from "react";
import styles from './CategoryList.module.css';
import Carousel from "../Carousel";
import CategoryListItem from "../CategoryListItem";

function CategoryList() {
    const categories = [
        {
            name: "premium wallets",
            url: "https://ecomm-project-ziplix.s3.amazonaws.com/homepage-images/premium-wallets.jpeg"
        },
        {
            name: "metal wallets",
            url: "https://ecomm-project-ziplix.s3.amazonaws.com/homepage-images/metal-wallets.jpeg"
        },
        {
            name: "cases",
            url: "https://ecomm-project-ziplix.s3.amazonaws.com/homepage-images/cases.png"
        },
        {
            name: "airtag wallets",
            url: "https://ecomm-project-ziplix.s3.amazonaws.com/homepage-images/airtag-wallets.jpeg"
        },
        {
            name: "accessories",
            url: "https://ecomm-project-ziplix.s3.amazonaws.com/homepage-images/accessories.jpeg"
        },
        {
            name: "shop all",
            url: "https://ecomm-project-ziplix.s3.amazonaws.com/homepage-images/shop-all.jpeg"
        }
    ];

    return (
        <div>
            <div className={styles.desktop}>
                <h2>shop by category</h2>
                <div className={styles.flexContainer}>
                    {categories.map((category) => (<CategoryListItem category={category} />))}
                </div>
            </div>
            <div className={styles.carouselContainer}>
                <Carousel title="shop by category" items={categories} itemType="category" />
            </div>
        </div>
    );
};

export default CategoryList;