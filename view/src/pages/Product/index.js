import React from "react";
import { useState } from "react";
import Rating from '@mui/material/Rating';
import styles from "./Product.module.css";
import './border.css';
import { products } from "../../data/mockData";
import BasicAccordion from "../../components/Accordion";
import ProductHighlights from "../../components/ProductHighlights";
import ProductList from "../../components/ProductList";

function Product() {
    const product = products[1];
    const [ chosenColor, setChosenColor ] = useState(product.colors[0]);
    const accordionItems = [
        {
            title: "Feature",
            content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget."
        },
        {
            title: "Specification",
            content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget."
        },
        {
            title: "Shipping and Delivery",
            content: <p>Free shipping order over $65+ <br /><br />We offer regular or express shipping to most addresses worldwide. Shipping cost and delivery times are calculated at checkout. <br /><br />Note: P.O. box deliveries will automatically be sent by regular shipping.</p>
        }
    ];

    function renderColors() {
        return (
            <ul>
                {
                    product.colors.map((color, index) => (
                        <li key={index} 
                            className={`${color.code === chosenColor.code && "chosenColorBorder"}`}
                            onClick={() => setChosenColor(color)}
                        ><div className={styles.color} style={{ backgroundColor: `${color.code}` }}></div></li>
                    ))
                }
            </ul>
        );
    };

    function renderHighlights() {
        return (
            <div className={styles.highlights}>
                {product.highlights.map((highlight, index) => (
                    <ProductHighlights 
                        position={`${index % 2 === 0 ? "right" : "left"}`}
                        url={highlight.url}
                        title={highlight.title}
                        description={highlight.description}
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
                        <img src={product.url} alt="Product photo" />
                    </div>
                </div>
                <div className={styles.rightSection}>
                    <div className={styles.productMeta}>
                        <h2>{product.product_name}</h2>
                        <div className={styles.rating}>
                            <Rating name="product-rating" defaultValue={product.rating} precision={0.5} readOnly />
                            <p>{product.total_reviews} {product.total_reviews > 1 ? "reviews" : "review"}</p>
                        </div>
                        <span>${product.unit_price}</span>
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
                        <p className={styles.description}>{product.description}</p>
                    </div>
                    <div className={styles.accordion}>
                        <BasicAccordion items={accordionItems}/>
                    </div>
                </div>
            </section>
            <section>
                {renderHighlights()}
            </section>
            <section className={styles.suggestion}>
                <h2>You May also Like</h2>
                <ProductList position="horizontal"/>
            </section>
        </div>
    );
};

export default Product;