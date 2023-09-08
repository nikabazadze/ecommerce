import React, { useState } from "react";
import styles from './PromoHeader.module.css';

function PromoHeader() {
    const promos = [
        "free shipping on order over $75+",
        "99 day risk free trial"
    ];
    
    return (
        <div className={styles.div}>
            <span className={styles.span}>{promos[0]}</span>
        </div>
    );
};

export default PromoHeader;