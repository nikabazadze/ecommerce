import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import styles from './Checkout.module.css';
import ScrollToTop from "../../components/ScrollToTop";
import AlertDialog from "../../components/AlertDialog";
import CartSummary from "../../components/CartSummary";

import CheckIcon from '@mui/icons-material/Check';
import applePayLogo from '../../assets/logos/paymentLogos/applePay.svg';
import googlePayLogo from '../../assets/logos/paymentLogos/googlePay.svg';
import paypalPayLogo from '../../assets/logos/paymentLogos/paypalPay.svg';
import shopPayLogo from '../../assets/logos/paymentLogos/shopPay.svg';
import amazonPayLogo from '../../assets/logos/paymentLogos/amazonPay.svg';

function Checkout() {
    const [ email, setEmail ] = useState("");
    const [ country, setCountry ] = useState("");
    const [ firstName, setFirstName ] = useState("");    
    const [ lastName, setLastName ] = useState("");
    const [ address, setAddress ] = useState("");
    const [ apartment, setApartment ] = useState("");
    const [ city, setCity ] = useState("");
    const [ state, setState ] = useState("");
    const [ zipCode, setZipCode ] = useState("");
    const [ phone, setPhone ] = useState("");
    const [ subscribe, setSubscribe ] = useState(true);
    const [ openDialog, setOpenDialog ] = useState(false);
    const [ dialogContent, setDialogContent ] = useState("");
    const dialogTitle = "Could not open the page!"

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])

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

    const handleDialogClick = ({target}) => {
        if (target.tagName === "IMG") {
            setDialogContent("This payment method has not been implemented yet! It is rendered only for visual purposes.");
        } else {
            setDialogContent("There is no content/page for this list item. This list item is rendered only for visual purposes.");
        }
        setOpenDialog(true);
    };

    return (
        <div className={styles.checkoutPage}>
            <ScrollToTop />

            {/* Left side */}
            <div className={styles.leftContainer}>
                <div className={styles.leftContent}>
                    <header>
                        <h1>ZiPLiX</h1>
                        <div className={styles.breadcrumbs}>
                            <p>Cart &#10095; Infortmation &#10095; Shipping &#10095; Payment</p>
                        </div>
                    </header>
                    <section className={styles.expressCheckout}>
                        <h3>express checkout</h3>
                        <div className={styles.expressPaymentsContainer}>
                            <img src={shopPayLogo}   onClick={handleDialogClick} />
                            <img src={paypalPayLogo} onClick={handleDialogClick} />
                            <img src={amazonPayLogo} onClick={handleDialogClick} />
                            <img src={applePayLogo}  onClick={handleDialogClick} />
                            <img src={googlePayLogo} onClick={handleDialogClick} />
                        </div>
                    </section>
                    <div className={styles.divider}>
                        <hr />
                        <h3>OR</h3>
                    </div>
                    <section className={styles.contact}>
                        <div className={styles.contactHeader}>
                            <h2>Contact</h2>
                            <p>Have an account? <Link to="/account/login" className={styles.link}>Log In</Link></p>
                        </div>
                        {renderInput("Email", "email", email, setEmail, "email")}
                        <div className={styles.subscribe}>
                            <div className={`${styles.checkbox} ${subscribe && styles.black}`} onClick={() => setSubscribe(!subscribe)}>
                                {subscribe && <CheckIcon sx={{color: "white", fontSize: 14}} />}
                            </div>
                            <p>Email me with news and offers</p>
                        </div>
                    </section>
                    <section className={styles.shipping}>
                        <h2>Shipping address</h2>
                        <form>
                            {renderInput("Country", "country", country, setCountry)}
                            <div className={styles.inputsContainer}>
                                {renderInput("First name", "firstName", firstName, setFirstName)}
                                {renderInput("Last name", "lastName", lastName, setLastName)}
                            </div>
                            {renderInput("Address", "address", address, setAddress)}
                            {renderInput("Apartment, suite, etc. (optional)", "apartment", apartment, setApartment)}
                            <div className={styles.inputsContainer}>
                                {renderInput("City", "city", city, setCity)}
                                {renderInput("State", "state", state, setState)}
                                {renderInput("ZIP code", "zipCode", zipCode, setZipCode)}
                            </div>
                            {renderInput("Phone", "phone", phone, setPhone)}
                            <div className={styles.formFooter}>
                                <div>
                                    <p><span>&#10094;</span> Return to cart</p>
                                </div>
                                <button type="submit" className={styles.submitButton}>Buy Now</button>
                            </div>
                        </form>
                    </section>
                    <div className={styles.actions}></div>
                    <footer>
                        <nav>
                            <ul>
                                <li onClick={handleDialogClick}>Refund policy</li>
                                <li onClick={handleDialogClick}>Shipping policy</li>
                                <li onClick={handleDialogClick}>Privacy policy</li>
                                <li onClick={handleDialogClick}>Terms of service</li>
                            </ul>
                        </nav>
                    </footer>
                </div>
            </div>

            {/* Right side */}
            <div className={styles.rightContainer}>
                <div className={styles.cartSummaryContainer}>
                    <CartSummary />
                </div>
            </div>
            {openDialog && <AlertDialog title={dialogTitle} content={dialogContent} onClose={setOpenDialog} />}
        </div>
    );
};

export default Checkout;