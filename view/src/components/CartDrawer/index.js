import React, { useState } from "react";
import { Link } from 'react-router-dom';
import styles from './CartDrawer.module.css';
import CartSummary from "../CartSummary";
import Drawer from '@mui/material/Drawer';
import LockIcon from '@mui/icons-material/Lock';
import CloseIcon from '@mui/icons-material/Close';

function CartDrawer({onClose}) {
    const [ open, setOpen ] = useState(true);

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
                <div className={styles.cartSummaryContainer}>
                    <CartSummary />
                </div>
                <div className={styles.footer}>
                    <Link className={styles.link} to={"/checkout"}>
                        <button className={styles.checkoutButton}>
                            <LockIcon className={styles.lockIcon}/>
                            checkout
                        </button>
                    </Link>
                </div>
            </div>
        </Drawer>
    );
}

export default CartDrawer;