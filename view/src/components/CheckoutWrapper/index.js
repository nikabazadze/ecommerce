import { useEffect } from "react";
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectCart } from "../../store/CartSlice";
import Checkout from "../../pages/Checkout";
import CircularProgress from '@mui/material/CircularProgress';

const center = {
    width: "100vw",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
}

function CheckoutWrapper() {
    const navigate = useNavigate();
    const cart = useSelector(selectCart);

    // Cart is "hydrated" only once the slice exposes `cartItems`.
    const isHydrated = cart && Object.prototype.hasOwnProperty.call(cart, "cartItems");

    useEffect(() => {
        if (!isHydrated) return;
        if (cart.cartItems.length === 0) {
        navigate('/shop', { replace: true });
        }
    }, [isHydrated, cart, navigate]);

    // While we’re waiting for hydration (right after a refresh), show a spinner.
    if (!isHydrated) {
        return (
        <div style={center}>
            <CircularProgress size={60} />
        </div>
        );
    }

    // If hydrated and non-empty, allow access to Checkout.
    return <Checkout />;
}

export default CheckoutWrapper;