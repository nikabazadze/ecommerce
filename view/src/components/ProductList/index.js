import React from "react";
import { Link } from 'react-router-dom';

import Grid from '@mui/material/Grid';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

import styles from './ProductList.module.css';
import ProductListItem from "../ProductListItem";

function ProductList({products, position = "grid"}) {
    if (!products) {
        return <div>Loading...</div>;
    };

    function handleClick(direction) {
        const list = document.getElementById("flexContainer");
        const product = list.children[0];
        const productWidth = product.offsetWidth;
        const flexGap = 2 * 16;
        const scrollSize = productWidth + flexGap;
        list.scrollBy({
            top: 0,
            left: `${direction === "right" ? scrollSize : -scrollSize}`,
            behavior: "smooth"
        });
    };

    return (
        <div>
            {position === "grid" ? 
                <div className={styles.gridContainer}>
                    <Grid container rowSpacing={5} columnSpacing={2.5} alignItems="strech">
                        {
                            products.map((product) => (
                                <Grid item xs={3} key={product.id} >
                                    <ProductListItem product={product} />
                                </Grid>
                            ))
                        }
                    </Grid>
                </div>
                :
                <div>
                    <div className={styles.scrollContainer}>
                        <div className={styles.iconContainer}>
                            <KeyboardArrowLeftIcon  sx={{ fontSize: 30}} onClick={() => handleClick("left")}  />
                            <KeyboardArrowRightIcon sx={{ fontSize: 30}} onClick={() => handleClick("right")} />
                        </div>
                        <Link to={"/shop"} >shop all</Link>
                    </div>
                    <div className={styles.flexContainer} id="flexContainer">
                        {products.map((product) => <ProductListItem product={product} key={product.id} />)}
                    </div>
                </div>
            }
        </div>
    );
};

export default ProductList;