import React from "react";
import { Link } from 'react-router-dom';
import styles from './CategoryListItem.module.css';

function CategoryListItem({category}) {
    return (
        <Link to="/shop" className={styles.link} >
            <div className={styles.card}>
                    <div className={styles.imgContainer}>
                        <img src={category.url} alt="Product category photo"/>
                    </div>
                    <h3>{category.name}</h3>
            </div>
        </Link>
    );
};

export default CategoryListItem;