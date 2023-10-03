import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import styles from './LoginForm.module.css';
import TextField from '@mui/material/TextField';
import { login } from "../../API";
import AuthButton from "../AuthButton";

function LoginForm() {
    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (email, password) {
            const status = await login(email, password);
            
            if (status === 200) {
                console.log("Loged in successfuly!");
                navigate("/");
            } else {
                console.log("Error! Log in wasn't processed.");
            }

            setEmail("");
            setPassword("");
        } else {
            console.log("Fill all required fields in the log in form!");
        }
    };

    return (
        <form className={styles.form} onSubmit={handleSubmit}>
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
            <AuthButton type="submit" action="Log in" />
        </form>
    );
};

export default LoginForm;