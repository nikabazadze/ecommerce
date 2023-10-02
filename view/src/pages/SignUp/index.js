import React, { useState } from "react";
import styles from './SignUp.module.css';
import TextField from '@mui/material/TextField';
import GoogleLogo from '../../assets/images/googleLogo.svg';
import fbLogo from '../../assets/images/fbLogo.svg';

function SignUp() {
    const [ firstName, setFirstName ] = useState("");
    const [ lastName, setLastName ] = useState("");
    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Sign up completed!");
    };
 
    return (
        <div className={styles.mainContainer}>
            <div className={styles.wallpaper}></div>
            <div className={styles.signUpContainer}>
                <div className={styles.signUp}>
                    <h1>join ZiPLiX <br />for the best gear</h1>
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
                        <button type="submit" className={styles.button}>Sign up</button>
                    </form>
                    <div className={styles.divider}>
                        <hr />
                        <span>OR</span>
                    </div>
                    <div className={styles.ssoContainer}>
                        <button className={styles.button}><img src={GoogleLogo} />Continue with Google</button>
                        <button className={styles.button}><img src={fbLogo} />Continue with Facebook</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUp;