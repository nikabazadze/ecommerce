import React from "react";
import Grid from '@mui/material/Grid';

import styles from './CategoryList.module.css';
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
            <Grid container spacing={3}>
                {
                    categories.map((category, index) => (
                        <Grid item xs={4} key={index}>
                            <CategoryListItem category={category} />
                        </Grid>
                    ))
                }
            </Grid>
        </div>
    );
};

export default CategoryList;