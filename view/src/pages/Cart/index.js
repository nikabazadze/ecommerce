import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styles from './Cart.module.css';
import AddIcon from '@mui/icons-material/Add';
import ClearIcon from '@mui/icons-material/Clear';
import { loadUserCart, selectCart, selectUser, selectCartIsLoading, selectCartHasError } from "../../store/UserSlice";

function Cart() {
    const dispatch = useDispatch();
    const user = useSelector(selectUser);
    const cart = useSelector(selectCart);
    const cartIsLoading = useSelector(selectCartIsLoading);
    const cartHasError = useSelector(selectCartHasError);

    useEffect(() => {
        if (user.id) dispatch(loadUserCart(user.id));
    }, [user, dispatch]);

    if (cartIsLoading || !user.id) {
        return (
            <div>Cart is loading</div>
        );
    };

    if (cartHasError) {
        return (
            <div>Error while loading cart</div>
        );
    };

    function renderTable() {
        return (
            <table>
                <thead>
                    <tr>
                        <th scope="col">Product</th>
                        <th scope="col">Price</th>
                        <th scope="col">Quantity</th>
                        <th scope="col">Total</th>
                    </tr>
                </thead>
                <tbody>
                    {renderCartItems()}
                </tbody>
            </table>
        );
    };

    const renderCartItems = () => {
        if (!cart.cartItems) return null;
        return cart.cartItems.map((cartItem) => (
            <tr key={cartItem.productId}>
                <td className={styles.product}>
                    <div className={styles.imgContainer}>
                        <img src={cartItem.imgUrl} alt="Product picture" />
                    </div>
                    <div className={styles.meta}>
                        <p>{cartItem.productName}</p>
                        <p>color: {cartItem.colorName}</p>
                    </div>
                </td>
                <td className={styles.price}>{cartItem.unitPrice}</td>
                <td className={styles.quantity}>
                    <div className={styles.quantityWrapper}>
                        <div>
                            <span>{cartItem.productQuantity}</span>
                            <AddIcon className={styles.addIcon}/>
                        </div>
                        <div>
                            <span>Remove</span>
                            <ClearIcon className={styles.clearIcon} fontSize="small"/>
                        </div>
                    </div>
                </td>
                <td className={styles.total}>{cartItem.unitPrice * cartItem.productQuantity}</td>
            </tr>
        ));
    };
    
    return (
        <div className={styles.cartPage}>
            <h1>shopping cart</h1>
            {console.log("does this gets logged?")}
            <div className={styles.table}>{renderTable()}</div>
            <div className={styles.cartFooter}>
                <p>{`Subtotal: $${cart.totalValue}`}</p>
                <p>Taxes and <span>Shipping</span> calculated at chekout</p>
                <button>Check Out</button>
            </div>
        </div>
    );
};

export default Cart;