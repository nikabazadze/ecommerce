import styles from './Divider.module.css';

function Divider({ fontSize, fontWeight, fontColor, lineColor }) {
    const fontStyles = {
        fontSize: fontSize ? fontSize : "0.875rem",
        fontWeight: fontWeight ? fontWeight : "400",
        color: fontColor ? fontColor : "#454545",
    };


    return (
            <div className={styles.divider}>
                <hr style={lineColor ? {borderTop: `1px solid ${lineColor}`} : {}} />
                <span style={fontStyles}>OR</span>
            </div>
    );
};

export default Divider;