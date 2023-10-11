import React, { useState } from "react";
import styles from './Auth.module.css';
import SignUpForm from "../SignUpForm";
import LoginForm from "../LoginForm";
import GoogleLogo from '../../assets/images/googleLogo.svg';
import fbLogo from '../../assets/images/fbLogo.svg';
import AuthButton from "../AuthButton";

function Auth() {
    const [ isSignupPage, setIsSignupPage ] = useState(true);

    return (
        <div className={styles.mainContainer}>
            <div className={isSignupPage ? styles.signupWallpaper : styles.loginWallpaper}></div>
            <div className={styles.rightContainer}>
                <div className={styles.authContainer}>
                    {isSignupPage ? <h1>JOIN ZiPLiX <br />FOR THE BEST GEAR</h1> : <h1>Log in</h1>}
                    {isSignupPage ? <SignUpForm /> : <LoginForm />}
                    <div className={styles.question}>
                        {isSignupPage ? 
                            <p>Already have an account? <span onClick={() => setIsSignupPage(false)}>Log in</span></p>
                            :
                            <p>Don't have an account? <span onClick={() => setIsSignupPage(true)}>Sign up</span></p>
                        }
                    </div>
                    <div className={styles.divider}>
                        <hr />
                        <span>OR</span>
                    </div>
                    <div className={styles.ssoContainer}>
                        <AuthButton type="sso" action="Continue with Google" src={GoogleLogo} />
                        <AuthButton type="sso" action="Continue with Facebook" src={fbLogo} imgPadding="0.375rem" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Auth;