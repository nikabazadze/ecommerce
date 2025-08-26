import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from 'react-router-dom';

import styles from './CartDrawer.module.css';
import CartSummary from "../CartSummary";
import Drawer from '@mui/material/Drawer';
import LockIcon from '@mui/icons-material/Lock';
import CloseIcon from '@mui/icons-material/Close';
import { selectCart } from "../../store/CartSlice";

function CartDrawer({ onClose, allowUpdate = true }) {
    const [ open, setOpen ] = useState(true);
    const cart = useSelector(selectCart);

    const handleClose = () => {
        setOpen(false);
        onClose(false);
    };

    return (
        <Drawer
            anchor="right"
            open={open}
            onClose={handleClose}
        >
            <div className={styles.drawerContainer}>
                <div className={styles.header}>
                    <h3>your cart</h3>
                    <CloseIcon className={styles.closeIcon} onClick={handleClose} />
                </div>
                {Object.keys(cart).length > 0 && cart.cartItems.length > 0
                    ?
                <>
                    <div className={styles.cartSummaryContainer}>
                        <CartSummary allowUpdate={allowUpdate} />
                    </div>
                    <div className={styles.footer}>
                        <Link className={styles.link} to={"/checkout"}>
                            <button className={styles.checkoutButton}>
                                <LockIcon className={styles.lockIcon}/>
                                checkout
                            </button>
                        </Link>
                    </div>
                </>
                    :
                <div className={styles.emptyCart}>
                    <p>Your cart is empty!</p>
                    <Link to={"/shop"} className={styles.buttonContainer}><button className={styles.button}>shop now</button></Link>
                </div>
                }
            </div>
        </Drawer>
    );
}

export default CartDrawer;