import React from "react";
import styles from './input.module.css';

function Input({label, inputId, state, setState, inputType, isRequired, placeholder, height}) {
    return (
        <div className={styles.inputWrapper} style={height ? {height: height} : {}}>
            <label htmlFor={inputId} className={(state || placeholder) && styles.smallerLabel}>{label}</label>
            <input 
                id={inputId}
                type={inputType || "text"}
                onChange={({target}) => setState(target.value)}
                value={state}
                className={`${styles.input} ${(state || placeholder) && styles.morePadding}`}
                required={isRequired === "false" ? false : true}
                placeholder={placeholder ? placeholder : ""}
            />
        </div>
    );
}

export default Input;