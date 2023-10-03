import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import styles from './LoginForm.module.css';
import TextField from '@mui/material/TextField';
import { login } from "../../API";
import AuthButton from "../AuthButton";
import { setUser, setIsLoggedIn } from "../../store/UserSlice";

function LoginForm() {
    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (email, password) {
            const response = await login(email, password);
            
            if (response.success) {
                console.log(response.message);
                dispatch(setUser(response.user));
                dispatch(setIsLoggedIn(true));
                navigate("/");
            } else {
                console.log(response.message);
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