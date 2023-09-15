import React from "react";
import { Link } from 'react-router-dom';
import styles from './CategoryListItem.module.css';

function CategoryListItem({category}) {
    return (
        <div className={styles.card} onClick={() => window.scrollTo(0, 0)}>
            <Link to="/shop">
                <div className={styles.imgContainer}>
                    <img src={category.url} alt="Product category photo"/>
                </div>
                <h3>{category.name}</h3>
            </Link>
        </div>
    );
};

export default CategoryListItem;