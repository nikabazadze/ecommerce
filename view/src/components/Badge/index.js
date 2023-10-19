import React from "react";

function Badge({count, size, fontSize, color, translate}) {
    const divStyle = {
        fontSize: `${fontSize || "0.75rem"}`,
        fontWeight: 500,
        width: `${size || "1.25rem"}`,
        height: `${size || "1.25rem"}`,
        borderRadius: "50%",
        backgroundColor: `${color || "#707070"}`,
        color: "#fff",
        position: "absolute",
        top: 0,
        right: 0,
        transform: `translate(+${translate || "40"}%, -${translate || "40"}%)`,
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    }

    return (
        <div style={divStyle}>{count}</div>
    );
}

export default Badge;