import React from "react";
import { useRef, useState } from "react";
import { Link } from 'react-router-dom';

import styles from './Carousel.module.css';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

import ProductCard from "../ProductCard";
import CategoryListItem from "../CategoryListItem";

function Carousel({ title, items, itemType = "product" }) {
    const carouselRef = useRef(null);
    const [touchStartX, setTouchStartX] = useState(0);
    const [touchEndX, setTouchEndX] = useState(0);

    // Moves carousel left or right
    function handleClick(direction) {
        const product = carouselRef.current.children[0];
        const productWidth = product.offsetWidth;
        const flexGap = 2 * 16;
        const scrollSize = (productWidth + flexGap) * 2;
        carouselRef.current.scrollBy({
            top: 0,
            left: `${direction === "right" ? scrollSize : -scrollSize}`,
            behavior: "smooth"
        });
    };

    // Touch event handlers for swipe functionality
    const handleTouchStart = (e) => {
        setTouchStartX(e.targetTouches[0].clientX);
    };

    const handleTouchMove = (e) => {
        setTouchEndX(e.targetTouches[0].clientX);
    };

    const handleTouchEnd = () => {
        const swipeDistance = touchStartX - touchEndX;
        if (Math.abs(swipeDistance) > 50) {
            carouselRef.current.scrollBy({
                top: 0,
                left: swipeDistance,
                behavior: "smooth"
            });
        }
    };

    return (
        <div>
            <header className={styles.header}>
                <h2>{title}</h2>
                <div>
                    <div className={styles.arrowContainer}>
                        <KeyboardArrowLeftIcon  sx={{ fontSize: 30}} onClick={() => handleClick("left")}  />
                        <KeyboardArrowRightIcon sx={{ fontSize: 30}} onClick={() => handleClick("right")} />
                    </div>
                    <Link to={"/shop"} >shop all</Link>
                </div>
            </header>
            <div 
                className={styles.carouselContainer} 
                ref={carouselRef} 
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
            >
                {(itemType === "product") ? 
                items.map((item) => <ProductCard product={item} key={item.id} />) : 
                items.map((item) => <CategoryListItem category={item} />)}
            </div>
        </div>
    );
};

export default Carousel;