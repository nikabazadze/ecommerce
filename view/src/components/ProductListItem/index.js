import React from "react";
import { Link } from 'react-router-dom';
import Rating from '@mui/material/Rating';

import styles from './ProductListItem.module.css';

function ProductListItem({ product }) {
    return (
        <Link to={`/products/${product.id}?variant=0`} className={styles.link}>
            <div className={styles.card} >
                <div className={styles.imgContainer}>
                    <img src={product.productVariants[0].imgUrls[0]} alt="Product photo"/>
                </div>
                <div className={styles.productMeta}>
                    <div>
                        <h3>{product.productName}</h3>
                        <p>{product.smallDescription}</p>
                    </div>
                    <div>
                        <div className={styles.reviews}>
                            <Rating name="product-rating" defaultValue={parseFloat(product.reviewsScore)} precision={0.5} readOnly />
                            <p>{product.reviewsQuantity} {product.reviewsQuantity > 1 ? "reviews" : "review"}</p>
                        </div>
                        <span>${product.unitPrice}</span>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default ProductListItem;