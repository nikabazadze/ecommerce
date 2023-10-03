import React from "react";
import styles from './AuthButton.module.css';

function AuthButton({action, type = "", src = "", imgPadding}) {
    return (
        <button className={`${styles.button} ${type === "submit" && styles.submitButton} ${type === "sso" && styles.ssoButton}`} 
                type={`${type === "submit" ? type : ""}`} 
        >
            {src && <img src={src} style={{padding: `${imgPadding}`}}/>}
            {action}
        </button>
    );
};

export default AuthButton;