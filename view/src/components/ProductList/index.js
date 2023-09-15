import React from "react";
import Grid from '@mui/material/Grid';

import styles from './ProductList.module.css';
import ProductListItem from "../ProductListItem";
import { products } from '../../data/mockData';

function ProductList() {
    return (
        <div>
            <Grid container rowSpacing={5} columnSpacing={2.5} alignItems="strech">
                {
                    products.map((product) => (
                        <Grid item xs={3}>
                            <ProductListItem product={product} />
                        </Grid>
                    ))
                }
            </Grid>
        </div>
    );
};

export default ProductList;