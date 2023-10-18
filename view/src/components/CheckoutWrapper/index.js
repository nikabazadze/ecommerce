import React, { useEffect } from "react";
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectCart } from "../../store/CartSlice";
import Checkout from "../../pages/Checkout";
import CircularProgress from '@mui/material/CircularProgress';

const divStyle = {
    width: "100vw",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
}

function CheckoutWrapper() {
    const navigate = useNavigate();
    const cart = useSelector(selectCart);

    useEffect(() => {
        if (Object.keys(cart).length === 0) {
            navigate('/cart');
        }
    }, [cart, navigate]);

    if (Object.keys(cart).length === 0) {
        return  <div style={divStyle}>
                    <CircularProgress size={60} />
                </div>;
    }

    return <Checkout />;
}

export default CheckoutWrapper;