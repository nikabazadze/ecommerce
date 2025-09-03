import { useState } from "react";
import { Link, useParams } from 'react-router-dom';
import styles from './Auth.module.css';
import Divider from "../../components/Divider";
import LoginForm from "../../components/LoginForm";
import SignUpForm from "../../components/SignUpForm";
import AuthButton from "../../components/AuthButton";
import AlertDialog from "../../components/AlertDialog";
import fbLogo from '../../assets/images/fbLogo.svg';
import GoogleLogo from '../../assets/images/googleLogo.svg';

function Auth() {
    let { action } = useParams();
    const isSignupPage = (typeof action === "undefined") || (action === "signup") ? true : false;

    const [ openDialog, setOpenDialog ] = useState(false);
    const dialogContent = "This auth method has not been implemented yet! It is rendered only for visual purposes.";
    const dialogTitle = "Could not open the page!";

    return (
        <div className={styles.mainContainer}>
                <div className={styles.authContainer}>
                    {isSignupPage ? <h1>JOIN ZiPLiX</h1> : <h1>Log in</h1>}
                    {isSignupPage ? <SignUpForm /> : <LoginForm />}
                    <div className={styles.question}>
                        {isSignupPage ? 
                            <p>Already have an account? <Link to="/account/login" className={styles.link}>Log in</Link></p>
                            :
                            <p>Don't have an account? <Link to="/account/signup" className={styles.link}>Sign up</Link></p>
                        }
                    </div>
                    <div className={styles.dividerContainer}>
                        <Divider />
                    </div>
                    <div className={styles.ssoContainer}>
                        <div onClick={() => setOpenDialog(true)} >
                            <AuthButton type="sso" action="Continue with Google" src={GoogleLogo} />
                        </div>
                        <div onClick={() => setOpenDialog(true)} >
                            <AuthButton type="sso" action="Continue with Facebook" src={fbLogo} imgPadding="0.375rem" />
                        </div>
                    </div>
                </div>
            {openDialog && <AlertDialog title={dialogTitle} content={dialogContent} onClose={setOpenDialog} />}
        </div>
    );
};

export default Auth;