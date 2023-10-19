import React, { useState } from "react";
import { useSelector } from "react-redux";
import styles from './CartSummary.module.css';
import { selectCart } from "../../store/CartSlice";
import Input from "../Input";
import Badge from "../Badge";


function CartSummary() {
    const [ promoCode, setPromoCode ] = useState("");
    const cart = useSelector(selectCart);

    const renderCartItems = () => {
        return (
            cart.cartItems.map(cartItem => (
                <div className={styles.cartItem} key={cartItem.productId}>
                    <div className={styles.imgOuterContainer}>
                        <div className={styles.imgContainer}>
                            <img src={cartItem.imgUrl} alt="Product image" />
                        </div>
                        <Badge count={cartItem.productQuantity} />
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
        <div className={styles.mainContainer}>
            <div className={styles.cartItems}>
                {renderCartItems()}
            </div>
            <form className={styles.promoContainer}>
                <div>
                    <Input label={"Discount code or gift card"} inputId={"promoCode"} state={promoCode} setState={setPromoCode} height={"2.625rem"} />
                </div>
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