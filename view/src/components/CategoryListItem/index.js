import React from "react";
import styles from './CategoryListItem.module.css';

function CategoryListItem({category}) {
    return (
        <div className={styles.card}>
            <div className={styles.imgContainer}>
                <img src={category.url} alt="Product category photo"/>
            </div>
            <h3>{category.name}</h3>
        </div>
    );
};

export default CategoryListItem;