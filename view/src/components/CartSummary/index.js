import React, { useState } from "react";
import { useSelector } from "react-redux";
import styles from './CartSummary.module.css';
import { selectCart } from "../../store/CartSlice";
import Input from "../Input";
import ChosenProducts from "../ChosenProducts";


function CartSummary() {
    const [ promoCode, setPromoCode ] = useState("");
    const cart = useSelector(selectCart);

    return (
        <div className={styles.mainContainer}>
            <div className={styles.cartItems}>
                {cart.cartItems && <ChosenProducts products={cart.cartItems} />}
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