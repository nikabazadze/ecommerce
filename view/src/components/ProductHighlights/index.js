import React from "react";
import styles from './ProductHighlights.module.css';

function ProductHighlights({position = "left", url, title = "", description = ""}) {
    return (
        <div className={styles.highlight} style={{ flexDirection: `${position === "right" && "row-reverse"}`}}>
            <div className={styles.imgContainer}>
                <img src={url} alt="Highlight photo"/>
            </div>
            <div className={styles.highlightText}>
                <h2>{title}</h2>
                <p>{description}</p>
            </div>
        </div>
    );
};

export default ProductHighlights;