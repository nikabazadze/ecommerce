import React from "react";
import { useState,useMemo, useEffect } from "react";
import { useSelector } from 'react-redux';
import { useParams, useSearchParams } from 'react-router-dom';

import './border.css';
import Rating from '@mui/material/Rating';
import styles from "./Product.module.css";
import BasicAccordion from "../../components/Accordion";
import ProductHighlights from "../../components/ProductHighlights";
import ProductList from "../../components/ProductList";
import { selectProductById, selectProducts } from "../../store/ProductsSlice";
import { getProductColors, getAccordionItems, getUrl } from "./productUtils";

function Product() {
    let { id } = useParams();
    const [ searchParams, setSearchParams ] = useSearchParams();
    const variantId = searchParams.get('variant');
    const products = useSelector(selectProducts);
    const product = useSelector(selectProductById(id));
    const productColors = useMemo(() => getProductColors(product), [product]);
    const accordionItems = product ? getAccordionItems(product) : [];
    const [chosenColor, setChosenColor] = useState(null);

    useEffect(() => {
        if (productColors.length > 0) {
            setChosenColor(productColors[0]);
        }
    }, [productColors]);

    useEffect(() => {
        if (chosenColor) setSearchParams({'variant': `${chosenColor.id}`});
    }, [chosenColor])

    if (!product || !chosenColor) {
        return <div>Loading...</div>;
    };

    const renderColors = () => {
        return (
            <ul>
                {
                    productColors.map((color) => (
                        <li key={color.code} 
                            className={`${color.code === chosenColor.code && "chosenColorBorder"}`}
                            onClick={() => setChosenColor(color)}
                        ><div className={styles.color} style={{ backgroundColor: `${color.code}` }}></div></li>
                    ))
                }
            </ul>
        );
    };

    const renderHighlights = () => {
        return (
            <div className={styles.highlights}>
                {product.highlights.map((highlight, index) => (
                    <ProductHighlights 
                        key={highlight.title}
                        position={`${index % 2 === 0 ? "right" : "left"}`}
                        url={highlight.url}
                        title={highlight.title}
                        description={highlight.content}
                    />
                ))}
            </div>
        )
    };

    return (
        <div className={styles.productPage}>
            <section className={styles.mainContainer}>
                <div className={styles.leftSection}>
                    <div className={styles.imgContainer}>
                        <img src={getUrl(product, chosenColor)} alt="Product photo" />
                    </div>
                </div>
                <div className={styles.rightSection}>
                    <div className={styles.productMeta}>
                        <h2>{product.productName}</h2>
                        <div className={styles.rating}>
                            <Rating name="product-rating" defaultValue={parseFloat(product.reviewsScore)} precision={0.5} readOnly />
                            <p>{product.reviewsQuantity} {product.reviewsQuantity > 1 ? "reviews" : "review"}</p>
                        </div>
                        <span>${product.unitPrice}</span>
                    </div>
                    <div className={styles.colorsContainer}>
                        <p>{chosenColor.name}</p>
                        {renderColors()}
                    </div>
                    <div className={styles.buttonsContainer}>
                        <button>ADD TO CART</button>
                        <button>Buy Now</button>
                    </div>
                    <div>
                        <p className={styles.shipping}>For EU and USA shipped within 1 business day</p>
                        <p className={styles.description}>{product.mainDescription}</p>
                    </div>
                    <div className={styles.accordion}>
                        <BasicAccordion items={accordionItems} />
                    </div>
                </div>
            </section>
            <section>
                {renderHighlights()}
            </section>
            <section className={styles.suggestion}>
                <h2>You May also Like</h2>
                <ProductList position="horizontal" products={products} />
            </section>
        </div>
    );
};

export default Product;