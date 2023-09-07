import React, { useState } from "react";
import styles from './PromoHeader.module.css';

function PromoHeader() {
    const promos = [
        "FREE SHIPPING ON ORDER OVER $75+",
        "99 DAY RISK FREE TRIAL"
    ];
    
    return (
        <div className={styles.div}>
            <span className={styles.span}>{promos[0]}</span>
        </div>
    );
};

export default PromoHeader;