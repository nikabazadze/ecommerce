import React from "react";
import { useState, useMemo, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';

import styles from "./Product.module.css";
import Rating from '@mui/material/Rating';
import Carousel from "../../components/Carousel";
import CartDrawer from "../../components/CartDrawer";
import ImageSlider from "../../components/ImageSlider";
import BasicAccordion from "../../components/Accordion";
import ProductHighlights from "../../components/ProductHighlights";
import { selectProductById, selectProducts } from "../../store/ProductsSlice";
import { getProductColors, getAccordionItems } from "./productUtils";
import { addCartItem } from "../../API";
import { selectUser, selectIsLoggedIn } from "../../store/UserSlice";
import { loadUserCart, loadGuestCart } from "../../store/CartSlice";
import { roundToTwoDecimalPlaces } from "../../utils/numberConversion";

function Product() {
    let { id } = useParams();
    const [ searchParams, setSearchParams ] = useSearchParams();
    const variant = searchParams.get('variant');
    const products = useSelector(selectProducts);
    const product = useSelector(selectProductById(id));
    const unitPrice = product ? product.productVariants[variant].unitPrice : 0;
    const accordionItems = product ? getAccordionItems(product) : [];
    const productColors = useMemo(() => getProductColors(product), [product]);
    const productImages = product ? product.productVariants[variant].imgUrls : [];
    const [chosenColor, setChosenColor] = useState(null);
    const [ quantity, setQuantity ] = useState(1);
    const [ openDrawer, setOpenDrawer ] = useState(false);
    const userLoggedIn = useSelector(selectIsLoggedIn);
    const user = useSelector(selectUser);
    const dispatch = useDispatch();
    const navigate = useNavigate();

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
                            className={`${color.code === chosenColor.code && styles.chosenColorBorder}`}
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

    const handleProductAdd = async () => {
        // Registered user
        if (userLoggedIn) {
            const response = await addCartItem(user.id, id, variant, quantity);
            if (response.status === 200) {
                dispatch(loadUserCart(user.id));
                setOpenDrawer(true);
            }
            return;
        }

        // Guest user
        const newCartItem = {
            productId: id,
            productName: product.productName,
            productQuantity: quantity,
            productVariant: variant,
            unitPrice: unitPrice,
            colorName: chosenColor.name,
            imgUrl: productImages[0]
        };

        let updatedCart;

        const guestCart = JSON.parse(localStorage.getItem('guestCart') || '{}');
        if (Object.keys(guestCart).length > 0) {
            const existingProduct = guestCart.cartItems ? 
                guestCart.cartItems.find(item => (item.productId === newCartItem.productId && item.productVariant === newCartItem.productVariant)) : undefined;
            if (existingProduct) {
                existingProduct.productQuantity += quantity;
            } else {
                if (!guestCart.cartItems) guestCart.cartItems = [];
                guestCart.cartItems.push(newCartItem);
            }

            guestCart.totalValue = roundToTwoDecimalPlaces(guestCart.totalValue + (unitPrice * quantity));
            updatedCart = guestCart;
        } else {
            updatedCart = {
                totalValue: roundToTwoDecimalPlaces(unitPrice * quantity),
                cartItems: [newCartItem]
            };
        }

        dispatch(loadGuestCart(updatedCart));
        localStorage.setItem('guestCart', JSON.stringify(updatedCart));
        setOpenDrawer(true);
    };

    const handleBuyNow = async () => {
        await handleProductAdd();
        navigate('/checkout');
    };

    return (
        <div className={styles.productPage}>
            <section className={styles.mainContainer}>
                <div className={styles.leftSection}>
                    <div className={styles.imageSliderContainer}>
                        <ImageSlider images={productImages} />
                    </div>
                </div>
                <div className={styles.rightSection}>
                    <div className={styles.productMeta}>
                        <h2>{product.productName}</h2>
                        <div className={styles.rating}>
                            <Rating name="product-rating" defaultValue={parseFloat(product.reviewsScore)} precision={0.5} readOnly />
                            <p>{product.reviewsQuantity} {product.reviewsQuantity > 1 ? "reviews" : "review"}</p>
                        </div>
                        <span>$ {unitPrice}</span>
                    </div>
                    <div className={styles.colorsContainer}>
                        <p>{chosenColor.name}</p>
                        {renderColors()}
                    </div>
                    <div className={styles.buttonsContainer}>
                        <button onClick={handleProductAdd}>ADD TO CART</button>
                        <button onClick={handleBuyNow}>Buy Now</button>
                        {openDrawer && <CartDrawer onClose={setOpenDrawer} />}
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
                <Carousel items={products} title="You May also Like" />
            </section>
        </div>
    );
};

export default Product;