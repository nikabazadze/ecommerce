import React from "react";
import Grid from '@mui/material/Grid';

import styles from './CategoryList.module.css';
import CategoryListItem from "../CategoryListItem";

function CategoryList() {
    const categories = [
        {
            name: "premium wallets",
            url: "https://vulkit.com/cdn/shop/files/vulkit_premium_leather_wallet_1_d277bb04-6b60-46d2-a879-5209ccd10969_1080x.jpg?v=1686810333"
        },
        {
            name: "metal wallets",
            url: "https://m.media-amazon.com/images/I/71U0vYHASgL._AC_SX679_.jpg"
        },
        {
            name: "cases",
            url: "https://www.ekster.com/cdn/shop/files/bags_cases.png?v=1663596199&width=360"
        },
        {
            name: "airtag wallets",
            url: "https://edgessentials.com/cdn/shop/products/edge-smart-airtag-wallet-137369.webp?v=1684695957"
        },
        {
            name: "accessories",
            url: "https://www.ekster.com/cdn/shop/files/5_113c1018-7914-458c-8b50-16b2f975601d.jpg?v=1688732574&width=540"
        },
        {
            name: "shop all",
            url: "https://www.ekster.com/cdn/shop/files/Product_Gallery_Carrousel_5519922b-08ce-4a58-998f-1d9343275791.jpg?v=1669635845&width=900"
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