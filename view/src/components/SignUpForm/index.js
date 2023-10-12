import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import styles from './SignUpForm.module.css';
import TextField from '@mui/material/TextField';
import { addUser } from "../../API";
import AuthButton from "../AuthButton";
import { checkGuestCart } from "../../utils/guestCartChecker";

function SignUpForm() {
    const [ firstName, setFirstName ] = useState("");
    const [ lastName, setLastName ] = useState("");
    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (firstName, lastName, email, password) {
            const response = await addUser(firstName, lastName, email, password);
            
            if (response.status === 201) {
                console.log("Sign up completed successfuly!");

                const jsonResponse = await response.json();
                const userId = jsonResponse.user.id;
                checkGuestCart(userId);

                navigate("/account/login");
            } else {
                console.log("Error! Sign up wasn't processed.");
            }

            setFirstName("");
            setLastName("");
            setEmail("");
            setPassword("");
        } else {
            console.log("Fill all required fields in the sign up form!");
        }
    };

    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.name}>
                <TextField 
                    id="firstName" 
                    label="First Name" 
                    value={firstName}
                    onChange={({target}) => setFirstName(target.value)}
                    sx={{width: "50%"}} 
                />
                <TextField 
                    id="lastName" 
                    label="Last Name" 
                    value={lastName}
                    onChange={({target}) => setLastName(target.value)}
                    sx={{width: "50%"}} 
                />
            </div>
            <TextField 
                id="email" 
                type="email" 
                value={email}
                onChange={({target}) => setEmail(target.value)}
                label="Email" 
                fullWidth 
            />
            <TextField 
                id="password" 
                type="password" 
                value={password}
                onChange={({target}) => setPassword(target.value)}
                label="Password" 
                fullWidth 
            />
            <AuthButton type="submit" action="Sign up" />
        </form>
    );
};

export default SignUpForm;