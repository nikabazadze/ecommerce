import React, { useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";

import { checkout } from "../../API";
import styles from './Checkout.module.css';
import Input from "../../components/Input";
import { selectCart } from "../../store/CartSlice";
import ScrollToTop from "../../components/ScrollToTop";
import AlertDialog from "../../components/AlertDialog";
import CartSummary from "../../components/CartSummary";
import { loadUserOrders } from "../../store/OrdersSlice";
import { formatPhoneNumber } from "../../utils/phoneNumberFormat";
import { selectIsLoggedIn, selectUser } from "../../store/UserSlice";

import CheckIcon from '@mui/icons-material/Check';
import shopPayLogo from '../../assets/logos/paymentLogos/shopPay.svg';
import applePayLogo from '../../assets/logos/paymentLogos/applePay.svg';
import googlePayLogo from '../../assets/logos/paymentLogos/googlePay.svg';
import paypalPayLogo from '../../assets/logos/paymentLogos/paypalPay.svg';
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
    const cart = useSelector(selectCart);
    const userLoggedIn = useSelector(selectIsLoggedIn);
    const user = useSelector(selectUser);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        if (userLoggedIn) {
            setFirstName(user.firstName);
            setLastName(user.lastName);
        }
    }, [userLoggedIn]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (country && firstName && lastName && address && city && state && zipCode && phone) {
            const requestBody = {
                cart: cart,
                userId: userLoggedIn ? user.id : null,
                firstName: firstName,
                lastName: lastName,
                country: country,
                address: address,
                apartment: apartment ? apartment : null,
                city: city,
                state: state,
                zipCode: zipCode,
                phone: phone
            };

            const response = await checkout(requestBody);
            if (response.status === 201) {
                const jsonResponse = await response.json();
                const newOrder = jsonResponse.order;
                console.log(jsonResponse.message);
                userLoggedIn ? dispatch(loadUserOrders(user.id)) : localStorage.removeItem('guestCart');
                navigate('/orderConfirm', { state: { fromCheckout: true, order: newOrder } });
            } else {
                console.log("New order was not placed!");
            }
        } else {
            console.log("All required fields must be filled to place the order!");
        }
    };

    const handleDialogClick = ({target}) => {
        if (target.tagName === "IMG") {
            setDialogContent("This payment method has not been implemented yet! It is rendered only for visual purposes.");
        } else {
            setDialogContent("There is no content/page for this list item. This list item is rendered only for visual purposes.");
        }
        setOpenDialog(true);
    };

    const handlePhoneChange = (value) => {
        const formattedPhoneNumber = formatPhoneNumber(value);
        setPhone(formattedPhoneNumber);
    };

    return (
        <div className={styles.checkoutPage}>
            <ScrollToTop />

            {/* Left side */}
            <div className={styles.leftContainer}>
                <div className={styles.leftContent}>
                    <header>
                        
                        <Link to={"/"} className={styles.link}><h1>ZiPLiX</h1></Link>
                        {/* <div className={styles.breadcrumbs}>
                            <p>Cart &#10095; Infortmation &#10095; Shipping &#10095; Payment</p>
                        </div> */}
                    </header>
                    <section className={styles.expressCheckout}>
                        <h3>express checkout</h3>
                        <div className={styles.expressPaymentsContainer}>
                            <img src={shopPayLogo}   onClick={handleDialogClick} alt="ShopPay logo" />
                            <img src={paypalPayLogo} onClick={handleDialogClick} alt="Paypal logo" />
                            <img src={amazonPayLogo} onClick={handleDialogClick} alt="AmazonPay logo" />
                            <img src={applePayLogo}  onClick={handleDialogClick} alt="ApplePay logo" />
                            <img src={googlePayLogo} onClick={handleDialogClick} alt="GooglePay logo" />
                        </div>
                    </section>
                    <div className={styles.divider}>
                        <hr />
                        <h3>OR</h3>
                    </div>
                    <section className={styles.contact}>
                        <div className={styles.contactHeader}>
                            <h2>Contact</h2>
                            {!userLoggedIn && <p>Have an account? <Link to="/account/login" className={styles.link}>Log In</Link></p>}
                        </div>
                        <Input label={"Email"} inputId={"email"} state={email} setState={setEmail} type={"email"} />
                        <div className={styles.subscribe}>
                            <div className={`${styles.checkbox} ${subscribe && styles.black}`} onClick={() => setSubscribe(!subscribe)}>
                                {subscribe && <CheckIcon sx={{color: "white", fontSize: 14}} />}
                            </div>
                            <p>Email me with news and offers</p>
                        </div>
                    </section>
                    <section className={styles.shipping}>
                        <h2>Shipping address</h2>
                        <form onSubmit={handleSubmit}>
                            <Input label={"Country"} inputId={"country"} state={country} setState={setCountry} />
                            <div className={styles.inputsContainer}>
                                <Input label={"First name"} inputId={"firstName"} state={firstName} setState={setFirstName} />
                                <Input label={"Last name"} inputId={"lastName"} state={lastName} setState={setLastName} />
                            </div>
                            <Input label={"Address"} inputId={"address"} state={address} setState={setAddress} />
                            <Input label={"Apartment, suite, etc. (optional)"} inputId={"apartment"} state={apartment} setState={setApartment} isRequired={"false"} />
                            <div className={styles.inputsContainer}>
                                <Input label={"City"} inputId={"city"} state={city} setState={setCity} />
                                <Input label={"State"} inputId={"state"} state={state} setState={setState} />
                                <Input label={"ZIP code"} inputId={"zipCode"} state={zipCode} setState={setZipCode} />
                            </div>
                            <Input label={"Phone"} inputId={"phone"} state={phone} setState={handlePhoneChange} type={"tel"} isRequired={true} placeholder="(xxx) xxx-xxxx" />
                            <div className={styles.formFooter}>
                                <div>
                                    <Link to={"/cart"} className={styles.link}><span>&#10094;</span> Return to cart</Link>
                                </div>
                                <button type="submit" className={styles.submitButton}>Buy Now</button>
                            </div>
                        </form>
                    </section>
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