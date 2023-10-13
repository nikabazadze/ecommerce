import React from "react";
import { Link, useParams } from 'react-router-dom';
import styles from './Auth.module.css';
import SignUpForm from "../SignUpForm";
import LoginForm from "../LoginForm";
import GoogleLogo from '../../assets/images/googleLogo.svg';
import fbLogo from '../../assets/images/fbLogo.svg';
import AuthButton from "../AuthButton";

function Auth() {
    let { action } = useParams();
    const isSignupPage = (typeof action === "undefined") || (action === "signup") ? true : false;

    return (
        <div className={styles.mainContainer}>
            <div className={isSignupPage ? styles.signupWallpaper : styles.loginWallpaper}></div>
            <div className={styles.rightContainer}>
                <div className={styles.authContainer}>
                    {isSignupPage ? <h1>JOIN ZiPLiX <br />FOR THE BEST GEAR</h1> : <h1>Log in</h1>}
                    {isSignupPage ? <SignUpForm /> : <LoginForm />}
                    <div className={styles.question}>
                        {isSignupPage ? 
                            <p>Already have an account? <Link to="/account/login" className={styles.link}>Log in</Link></p>
                            :
                            <p>Don't have an account? <Link to="/account/signup" className={styles.link}>Sign up</Link></p>
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