import React from "react";
import { useState, useRef, useEffect } from "react";
import styles from './ImageSlider.module.css';
import ModalSlider from "./ModalSlider";

function ImageSlider({images}) {
    const containerRef = useRef(null);
    const mainImageRef = useRef(null);
    const imageListRef = useRef(null);
    const [ currentIndex, setCurrentIndex ] = useState(0);
    const sliderWidth = images.length * 100;

    const [openModal, setOpenModal] = useState(false);
    const handleOpen = () => setOpenModal(true);

    useEffect(() => {
        if (!openModal) {
            updateMainSlider();
        }
    }, [currentIndex]);

    const updateMainSlider = () => {
        const imageWidth = containerRef.current ? containerRef.current.offsetWidth : 0;
        const newPosition = -currentIndex * imageWidth;
        mainImageRef.current.style.transform = `translateX(${newPosition}px)`;
    };

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
            <div className={styles.mainImageContainer} ref={containerRef}>
                <div 
                    ref={mainImageRef}
                    className={styles.imageSlider}  
                    style={{ width: `${sliderWidth}%` }}
                >
                    {images.map((image, index) => (
                        <div 
                            key={index} 
                            onClick={handleOpen}
                            className={styles.img}
                            style={{ backgroundImage: `url(${image})` }}
                        ></div>
                    ))}
                </div>
            </div>
            <div className={styles.prev} onClick={showPrevious} >&#10094;</div>
            <div className={styles.next} onClick={showNext} >&#10095;</div>
            <ul ref={imageListRef} className={styles.smallImagesContainer}>
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
            <ModalSlider images={images} open={openModal} setOpen={setOpenModal} mainSlideIndex={currentIndex} />
        </div>
    );
};

export default ImageSlider;