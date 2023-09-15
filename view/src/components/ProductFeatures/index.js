import React from "react";
import styles from './ProductFeatures.module.css';

function ProductFeatures({position = "left", url, title = "", description = ""}) {
    return (
        <div className={styles.feature} style={{ flexDirection: `${position === "right" && "row-reverse"}`}}>
            <div className={styles.imgContainer}>
                <img src={url} alt="Feature photo"/>
            </div>
            <div className={styles.featureText}>
                <h2>{title}</h2>
                <p>{description}</p>
            </div>
        </div>
    );
};

export default ProductFeatures;