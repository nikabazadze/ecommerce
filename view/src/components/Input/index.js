import React from "react";
import styles from './input.module.css';

function Input({label, inputId, state, setState, inputType, height}) {
    return (
        <div className={styles.inputWrapper} style={height ? {height: height} : {}}>
            <label htmlFor={inputId} className={state && styles.smallerLabel}>{label}</label>
            <input 
                id={inputId}
                type={inputType || "text"}
                onChange={({target}) => setState(target.value)}
                value={state}
                className={`${styles.input} ${state && styles.morePadding}`}
            />
        </div>
    );
}

export default Input;