import React, { useState } from "react";
import { useSelector } from "react-redux";
import styles from './CartSummary.module.css';
import { selectCart } from "../../store/CartSlice";
import Input from "../Input";
import ChosenProducts from "../ChosenProducts";


function CartSummary() {
    const [ promoCode, setPromoCode ] = useState("");
    const [ isValidPromoCode, setIsValidPromoCode ] = useState(true);
    const validPromoCodes = [];
    const cart = useSelector(selectCart);

    const handlePromoSubmit = (e) => {
        e.preventDefault();
        if (!validPromoCodes.includes(promoCode)) setIsValidPromoCode(false);
    };

    return (
        <div className={styles.mainContainer}>
            <div className={styles.cartItems}>
                {cart.cartItems && <ChosenProducts products={cart.cartItems} />}
            </div>
            <div className={styles.promoContainer} >
                <form 
                    onSubmit={handlePromoSubmit}
                >
                    <div>
                        <Input label={"Discount code or gift card"} inputId={"promoCode"} state={promoCode} setState={setPromoCode} height={"2.625rem"} />
                    </div>
                    <button type="submit" className={styles.promoButton}>apply</button>
                </form>
                <p style={isValidPromoCode ? {display: "none"} : {}}>This promo code is not valid!</p>
            </div>
            <div className={styles.subtotalContainer}>
                <div>
                    <p>Subtotal</p>
                    <span>${cart.totalValue}</span>
                </div>
                <div>
                    <p>Shipping</p>
                    <p className={styles.shippingPrg}>Calculated at next step</p>
                </div>
            </div>
            <div className={styles.totalContainer}>
                <p>Total</p>
                <span>${cart.totalValue}</span>
            </div>
        </div>
    );
}

export default CartSummary;