import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import styles from './PromoHeader.module.css';

function PromoHeader() {
    const [currentPromoIndex, setCurrentPromoIndex] = useState(0);
    const [animationClass, setAnimationClass] = useState(styles.slideIn);

    const promos = [
        "free shipping on order over $75+",
        "99 day risk free trial",
        <div className={styles.divPromoText}>
            <p>premium products</p>
            <span> | </span>
            <p>free returns</p>
        </div>,
    ];

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setAnimationClass(styles.slideOut);
        }, 4000);

        return () => clearTimeout(timeoutId);
    }, [currentPromoIndex]);

    useEffect(() => {
        if (animationClass === styles.slideOut) {
            const nextPromoIndex = (currentPromoIndex + 1) % promos.length;
            setTimeout(() => {
                setCurrentPromoIndex(nextPromoIndex);
                setAnimationClass(styles.slideIn);
            }, 100);
        }
    }, [animationClass, currentPromoIndex, promos.length]);

    return (
        <div className={styles.div}>
            <Link to="/shop" className={`${styles.link} ${animationClass}`}>{promos[currentPromoIndex]}</Link> </div>
    );
};

export default PromoHeader;