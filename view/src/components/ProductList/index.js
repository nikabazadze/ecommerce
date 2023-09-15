import React from "react";
import Grid from '@mui/material/Grid';

import styles from './ProductList.module.css';
import ProductListItem from "../ProductListItem";
import { products } from '../../data/mockData';

function ProductList({position = "grid"}) {
    return (
        <div>
            {position === "grid" ? 
                <div className={styles.gridContainer}>
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
                :
                <div className={styles.flexContainer}>
                    {products.map((product) => <ProductListItem product={product}/>)}
                </div>
            }
        </div>
    );
};

export default ProductList;