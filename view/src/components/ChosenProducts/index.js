import React from "react";
import styles from './ChosenProducts.module.css';
import Badge from "../Badge";

function ChosenProducts({ products }) {
    return (
        products.map(product => (
            <div className={styles.mainContainer} key={`${product.productId}_${product.productVariant}`}>
                <div className={styles.imgOuterContainer}>
                    <div className={styles.imgContainer}>
                        <img src={product.imgUrl} alt="Product image" />
                    </div>
                    <Badge count={product.productQuantity} />
                </div>
                <div className={styles.productMetaContainer}>
                    <div>
                        <p>{product.productName}</p>
                        <span>{product.colorName}</span>
                    </div>
                    <p>${product.unitPrice}</p>
                </div>
            </div>
        ))
    );
};

export default ChosenProducts;