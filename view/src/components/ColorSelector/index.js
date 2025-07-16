import styles from "./ColorSelector.module.css";

function ColorSelector({ colors, chosenColor, setChosenColor }) {
    return (
        <ul className={styles.container}>
            {
                colors.map((color) => (
                    <li key={color.code} 
                        className={`${color.code === chosenColor.code && styles.chosenColorBorder}`}
                        onClick={() => setChosenColor(color)}
                    ><div className={styles.color} style={{ backgroundColor: `${color.code}` }}></div></li>
                ))
            }
        </ul>       
    );
};

export default ColorSelector;