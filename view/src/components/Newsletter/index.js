import React from "react";
import { useState } from "react";
import styles from './Newsletter.module.css';

function Newsletter() {
    const [ email, setEmail ] = useState("");
    const [ errorMessage, setErrorMessage ] = useState("");

    const handleChange = ({target}) => {
        const value = target.value;
        setEmail(value);

        const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!pattern.test(value)) {
            setErrorMessage("Please enter a valid email address.");
        } else {
            setErrorMessage("");
        }
        target.setCustomValidity(errorMessage);
    };

    function handleSubmit(e) {
        e.preventDefault();

        if (!errorMessage) {
            // form submission logic here, e.g., API call, etc.
            console.log('Form submitted with email:', email);
            const form = document.getElementById("newsletterForm");
            const p = document.getElementById("subscribeSuccess");
            form.style.display = "none";
            p.style.display = "block";
        } else {
            console.log('Form has errors.');
        }
    };

    return (
        <div className={styles.container}>
            <h2>Join the list</h2>
            <p>For exclusive offers, early launch access, insider giveaways and more.</p>
            <form onSubmit={handleSubmit} id="newsletterForm">
                {/* {errorMessage && <p className={styles.errorText}>{errorMessage}</p>} */}
                <input 
                    type="email"
                    value={email}
                    placeholder="Email"
                    onChange={handleChange}
                    required
                    id="emailInput"
                    className={styles.input}
                />
                <button type="submit" className={styles.button}>subscribe</button>
            </form>
            <p className={styles.subscribeSuccess} id="subscribeSuccess">Thank you for subscribing!</p>
        </div>
    );
};

export default Newsletter;