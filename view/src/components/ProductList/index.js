import React from "react";
import Grid from '@mui/material/Grid';

import styles from './ProductList.module.css';
import ProductListItem from "../ProductListItem";
import { products } from '../../data/mockData';

function ProductList() {
    return (
        <div>
            <Grid container spacing={3}>
                {
                    products.map((product) => (
                        <Grid item>
                            <ProductListItem product={product} />
                        </Grid>
                    ))
                }
            </Grid>
        </div>
    );
};

export default ProductList;