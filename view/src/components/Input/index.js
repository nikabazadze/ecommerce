import styles from './input.module.css';

function Input({label, inputId, inputType, state, setState, isRequired, placeholder, width, height}) {
    let wrapperStyles = {};

    width && (wrapperStyles.width = width);
    height && (wrapperStyles.height = height);

    return (
        <div className={styles.inputWrapper} style={wrapperStyles}>
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