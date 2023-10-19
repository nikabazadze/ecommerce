import React, { useState } from "react";
import { useSelector } from "react-redux";
import styles from './CartSummary.module.css';
import { selectCart } from "../../store/CartSlice";


function CartSummary() {
    const [ promoCode, setPromoCode ] = useState("");
    const cart = useSelector(selectCart);

    const renderInput = (label, inputId, state, setState, inputType = "text") => {
        return (
            <div className={styles.inputWrapper}>
                <label htmlFor={inputId} className={state && styles.smallerLabel}>{label}</label>
                <input 
                    id={inputId}
                    type={inputType}
                    onChange={({target}) => setState(target.value)}
                    value={state}
                    className={`${styles.input} ${state && styles.morePadding}`}
                />
            </div>
        );
    };

    const renderCartItems = () => {
        return (
            cart.cartItems.map(cartItem => (
                <div className={styles.cartItem}>
                    <div className={styles.imgContainer}>
                        <img src={cartItem.imgUrl} alt="Product image" />
                    </div>
                    <div className={styles.productMetaContainer}>
                        <div>
                            <p>{cartItem.productName}</p>
                            <span>{cartItem.colorName}</span>
                        </div>
                        <p>${cartItem.unitPrice}</p>
                    </div>
                </div>
            ))
        );
    };

    return (
        <div className={styles.rightContent}>
            <div className={styles.cartItems}>
                {renderCartItems()}
            </div>
            <form className={styles.promoContainer}>
                {renderInput("Discount code or gift card", "promoCode", promoCode, setPromoCode)}
                <button type="submit" className={styles.promoButton}>Apply</button>
            </form>
            <div className={styles.subtotalContainer}>
                <div>
                    <p>Subtotal</p>
                    <span>{cart.totalValue}</span>
                </div>
                <div>
                    <p>Shipping</p>
                    <p className={styles.shippingPrg}>Calculated at next step</p>
                </div>
            </div>
            <div className={styles.totalContainer}>
                <p>Total</p>
                <span>{cart.totalValue}</span>
            </div>
        </div>
    );
}

export default CartSummary;