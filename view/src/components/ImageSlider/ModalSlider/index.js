import React from "react";
import { useState, useRef, useEffect } from "react";
import styles from './ModalSlider.module.css';
import Modal from '@mui/material/Modal';
import CloseIcon from '@mui/icons-material/Close';

function ModalSlider({images, open, setOpen, mainSlideIndex}) {
    const leftArrowRef = useRef(null);
    const rightArrowRef = useRef(null);
    const modalImageContainerRef = useRef(null);
    const modalMainImageRef = useRef(null);

    const [ currentIndex, setCurrentIndex ] = useState(mainSlideIndex);
    const sliderWidth = images.length * 100;

    const [touchStartX, setTouchStartX] = useState(null);

    useEffect(() => {
        if (open) {
            setCurrentIndex(mainSlideIndex);
        }
    }, [open, mainSlideIndex]);

    useEffect(() => {
        if (open) updateModalSlider();
    }, [currentIndex]);

    const handleClose = ({target}) => {
        const clickedArrows = (target === leftArrowRef.current) || (target === rightArrowRef.current);
        setOpen(clickedArrows);
    };

    const updateModalSlider = () => {
        const imageWidth = modalImageContainerRef.current ? modalImageContainerRef.current.offsetWidth : 0;
        const newPosition = -currentIndex * imageWidth;
        modalMainImageRef.current.style.transform = `translateX(${newPosition}px)`;
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

    const handleTouchStart = (e) => {
        setTouchStartX(e.touches[0].clientX);
    };

    const handleTouchEnd = (e) => {
        if (touchStartX === null) return;

        const touchEndX = e.changedTouches[0].clientX;
        const deltaX = touchStartX - touchEndX;

        if (deltaX > 30) {
            showNext();
        } else if (deltaX < -30) {
            showPrevious();
        }

        setTouchStartX(null);
    };

    return (
        <Modal
            open={open}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <div className={styles.modalMainContainer} onClick={handleClose}>
                <div className={styles.modalImgContainer}
                     ref={modalImageContainerRef}
                     onTouchStart={handleTouchStart}
                     onTouchEnd={handleTouchEnd}
                >
                    <div 
                        ref={modalMainImageRef}
                        className={styles.imageSlider}  
                        style={{ width: `${sliderWidth}%` }}
                    >
                        {images.map((image, index) => (
                            <div 
                                key={index} 
                                className={styles.img}
                                style={{ backgroundImage: `url(${image})` }}
                            ></div>
                        ))}
                    </div>
                </div>                    
                <div className={styles.prev} onClick={showPrevious} ref={leftArrowRef} >&#10094;</div>
                <div className={styles.next} onClick={showNext}  ref={rightArrowRef} >&#10095;</div>
                <CloseIcon className={styles.closeIcon} sx={{fontSize: 42}}/>
            </div>
        </Modal>
    );
};

export default ModalSlider;