import React from "react";
import Rating from '@mui/material/Rating';

import styles from './ProductListItem.module.css';

function ProductListItem({product}) {
    return (
        <div className={styles.card}>
            <div className={styles.imgContainer}>
                <img src={product.url} alt="Product photo"/>
            </div>
            <div className={styles.productMeta}>
                <div>
                    <h3>{product.product_name}</h3>
                    <p>{product.small_description}</p>
                </div>
                <div>
                    <div className={styles.rating}>
                        <Rating name="product-rating" defaultValue={product.rating} precision={0.5} readOnly />
                        <p>{product.total_reviews} {product.total_reviews > 1 ? "reviews" : "review"}</p>
                    </div>
                    <span>${product.unit_price}</span>
                </div>
            </div>
        </div>
    );
};

export default ProductListItem;