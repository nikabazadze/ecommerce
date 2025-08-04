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
                const container = imageListRef.current;

                const containerTop = imageListRef.current.scrollTop;
                const containerBottom = containerTop + imageListRef.current.clientHeight;

                const imageTop = currentImageElem.offsetTop;
                const imageBottom = imageTop + currentImageElem.clientHeight;

                // Image is out of view above
                if (imageTop < containerTop) {
                    container.scrollTo({
                        top: imageTop - 10,
                        behavior: "smooth",
                    });
                }
                // Image is out of view below
                else if (imageBottom > containerBottom) {
                    const overflow = imageBottom - containerBottom;
                    container.scrollTo({
                        top: container.scrollTop + overflow + 10,
                        behavior: "smooth",
                    });
                }
            }
        }
    };

    useEffect(() => {
        scrollToCurrentImage();
    }, [currentIndex]);

    const getthumbnailStyle = (image, index) => {
        return (window.innerWidth > 1050) ? { 
            backgroundImage: `url(${image})`, 
            boxShadow: `${index === currentIndex ? "0px 2px 18px rgba(0,0,0,0.15)" : ""} `
        } : 
        (index === currentIndex ? {
            transform: "scale(1.35, 1.35)",
            opacity: "1",
        } : {});
    };

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
                <div className={styles.prev} onClick={showPrevious} >&#10094;</div>
                <div className={styles.next} onClick={showNext} >&#10095;</div>
            </div>
            <ul ref={imageListRef} className={styles.thumbnail}>
                {images.map((image, index) => (
                    <li key={index} 
                        className={(window.innerWidth > 1050) ? styles.img : styles.dot}
                        onClick={() => setCurrentIndex(index)}
                        style={getthumbnailStyle(image, index)}
                    ><div className={index !== currentIndex && styles.overlay}></div></li>
                ))}
            </ul>
            <ModalSlider images={images} open={openModal} setOpen={setOpenModal} mainSlideIndex={currentIndex} />
        </div>
    );
};

export default ImageSlider;