import React, { useState } from "react";
import { Link } from 'react-router-dom';
import Rating from '@mui/material/Rating';

import styles from './ProductCard.module.css';

function ProductCard({ product, placement="horizontal" }) {
    const [ imageIndex, setImageIndex ] = useState(0);

    return (
        <Link to={`/products/${product.id}?variant=0`} className={styles.link} >
            <div className={(placement === "grid") ? styles.gridCard : styles.card} >
                <div className={styles.imgContainer} onMouseEnter={() => setImageIndex(1)} onMouseLeave={() => setImageIndex(0)} >
                    <img src={product.productVariants[0].imgUrls[imageIndex]} alt="Product photo" />
                </div>
                <div className={styles.productMeta}>
                    <h3>{product.productName}</h3>
                    <p>{product.smallDescription}</p>
                    <div className={styles.reviews}>
                        <Rating name="product-rating" defaultValue={parseFloat(product.reviewsScore)} precision={0.5} readOnly />
                        <p>({product.reviewsQuantity})</p>
                    </div>
                    <div className={styles.price}>
                        <span>$ {product.productVariants[0].unitPrice}</span>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default ProductCard;