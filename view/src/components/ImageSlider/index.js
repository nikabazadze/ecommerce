import React from "react";
import { useState, useRef, useEffect } from "react";
import styles from './ImageSlider.module.css';

function ImageSlider({images}) {
    const imageListRef = useRef(null);
    const [ currentIndex, setCurrentIndex ] = useState(0);

    const showPrevious = () => {
        const isFirstImage = currentIndex === 0;
        const newIndex = isFirstImage ? images.length - 1 : currentIndex - 1;
        setCurrentIndex(newIndex);
    };

    const showNext = () => {
        const isLastImage = currentIndex === images.length - 1;
        const newIndex = isLastImage ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex);
    };

    const scrollToCurrentImage = () => {
        if (imageListRef.current) {
            const imageElements = imageListRef.current.childNodes;
            const currentImageElem = imageElements[currentIndex];
    
            if (currentImageElem) {
                const containerLeft = imageListRef.current.scrollLeft;
                const containerRight = containerLeft + imageListRef.current.clientWidth;
                const imageLeft = currentImageElem.offsetLeft;
                const imageRight = imageLeft + currentImageElem.clientWidth;
    
                // Check if image is out of view on the left
                if (imageLeft < containerLeft) {
                    imageListRef.current.scrollLeft = imageLeft - 10;
                } 
                // Check if image is out of view on the right
                else if (imageRight > containerRight) {
                    const overflow = imageRight - containerRight;
                    imageListRef.current.scrollLeft += overflow + 10;
                }
            }
        }
    };

    useEffect(() => {
        scrollToCurrentImage();
    }, [currentIndex]);

    return (
        <div className={styles.container}>
            <div 
                className={styles.img}
                style={{ backgroundImage: `url(${images[currentIndex]})` }}
            ></div>
            <div className={styles.prev} onClick={showPrevious} >&#10094;</div>
            <div className={styles.next} onClick={showNext} >&#10095;</div>
            <ul ref={imageListRef}>
                {images.map((image, index) => (
                    <li key={index} 
                        className={styles.img}
                        onClick={() => setCurrentIndex(index)}
                        style={{ 
                            backgroundImage: `url(${image})`, 
                            border: `${index === currentIndex ? "2px solid rgb(107, 133, 206)" : ""} `,
                            boxShadow: `${index === currentIndex ? "0px 1px 5px magenta" : ""} `
                        }}
                    ></li>
                ))}
            </ul>
        </div>
    );
};

export default ImageSlider;