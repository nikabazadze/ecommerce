import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from 'react-router-dom';

import styles from './Cart.module.css';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import ClearIcon from '@mui/icons-material/Clear';
import { selectUser, selectIsLoggedIn } from "../../store/UserSlice";
import { loadGuestCart, selectCart, selectCartIsLoading, selectCartHasError, updateCartItemQuantity, removeCartItem } from "../../store/CartSlice";
import { updateCartItem, deleteCartItem } from "../../API";
import { roundToTwoDecimalPlaces } from "../../utils/numberConversion";
import CheckDialog from "../../components/CheckDialog";

function Cart() {
    const dispatch = useDispatch();
    const userLoggedIn = useSelector(selectIsLoggedIn);
    const user = useSelector(selectUser);
    const cart = useSelector(selectCart);
    const cartIsLoading = useSelector(selectCartIsLoading);
    const cartHasError = useSelector(selectCartHasError);
    const [ openDialog, setOpenDialog ] = useState(false);
    const [ removeProductId, setRemoveProductId ] = useState(null);
    const [ removeProductVariant, setRemoveProductVariant ] = useState(null);

    if (cartIsLoading) {
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
            <tr>
                <td className={styles.product}>
                    <Link to={`/products/${cartItem.productId}?variant=${cartItem.productVariant}`}>
                        <div className={styles.imgContainer}>
                            <img src={cartItem.imgUrl} alt="Product picture" />
                        </div>
                    </Link>
                    <div className={styles.meta}>
                        <Link to={`/products/${cartItem.productId}?variant=${cartItem.productVariant}`} className={styles.link}>
                            <p>{cartItem.productName}</p>
                        </Link>
                        <p>color: {cartItem.colorName}</p>
                    </div>
                </td>
                <td className={styles.price}>{cartItem.unitPrice}</td>
                <td className={styles.quantity}>
                    <div className={styles.quantityWrapper}>
                        <div>
                            <RemoveIcon className={styles.minusIcon} onClick={() => handleItemUpdate(cartItem.productId, cartItem.productVariant, cartItem.productQuantity -1)} />
                            <span>{cartItem.productQuantity}</span>
                            <AddIcon className={styles.addIcon} onClick={() => handleItemUpdate(cartItem.productId, cartItem.productVariant, cartItem.productQuantity + 1)} />
                        </div>
                        <div onClick={() => handleItemRemove(cartItem.productId, cartItem.productVariant)} >
                            <span>Remove</span>
                            <ClearIcon className={styles.clearIcon} fontSize="small"/>
                        </div>
                    </div>
                </td>
                <td className={styles.total}>{roundToTwoDecimalPlaces(cartItem.unitPrice * cartItem.productQuantity)}</td>
            </tr>
        ));
    };

    const handleItemUpdate = async (productId, variant, newQuantity) => {
        if (newQuantity === 0) {
            handleItemRemove(productId);
            return;
        }

        // Registered user
        if (userLoggedIn) {
            const response = await updateCartItem(user.id, productId, variant, newQuantity);
            if (response.status === 200) {
                console.log("Cart item updated successfully!");
                dispatch(updateCartItemQuantity({productId, variant, newQuantity}));
            }
            return;
        };

        // Guest user
        if (Object.keys(cart).length > 0) {
            let updatedCart = structuredClone(cart);
            const cartItem = updatedCart.cartItems.find(item => (item.productId === productId && item.productVariant === variant));
            const diff = newQuantity - cartItem.productQuantity;
            cartItem.productQuantity = newQuantity;
            updatedCart.totalValue = roundToTwoDecimalPlaces(updatedCart.totalValue + (diff * cartItem.unitPrice));

            dispatch(loadGuestCart(updatedCart));
            localStorage.setItem('guestCart', JSON.stringify(updatedCart));
        }
    };

    const handleItemRemove = (productId, productVariant) => {
        setRemoveProductId(productId);
        setRemoveProductVariant(productVariant);
        setOpenDialog(true);
    };

    const removeItem = async () => {
        // Registered user
        if (userLoggedIn) {
            const response = await deleteCartItem(user.id, removeProductId, removeProductVariant);
            if (response.status === 200) {
                console.log("Cart item deleted successfully!");
                const deleteProductMeta = {
                    productId: removeProductId,
                    variant: removeProductVariant
                }
                dispatch(removeCartItem(deleteProductMeta));
            }
            return;
        }

        // Guest user
        if (Object.keys(cart).length > 0) {
            let updatedCart = structuredClone(cart);
            const cartItem = updatedCart.cartItems.find(item => (item.productId === removeProductId && item.productVariant === removeProductVariant));
            updatedCart.totalValue = roundToTwoDecimalPlaces(updatedCart.totalValue - (cartItem.unitPrice * cartItem.productQuantity));
            updatedCart.cartItems = updatedCart.cartItems.filter(item => !(item.productId === removeProductId && item.productVariant === removeProductVariant));

            dispatch(loadGuestCart(updatedCart));
            localStorage.setItem('guestCart', JSON.stringify(updatedCart));
        }

        setRemoveProductId("");
        setRemoveProductVariant("");
    };
    
    return (
        <div className={styles.cartPage}>
            <h1>shopping cart</h1>
            {Object.keys(cart).length > 0 && cart.cartItems.length > 0
                ?
            <div>
                <div className={styles.table}>{renderTable()}</div>
                <div className={styles.cartFooter}>
                    <p>{`Subtotal: $${cart.totalValue}`}</p>
                    <p>Taxes and <span>Shipping</span> calculated at chekout</p>
                    <Link to="/checkout"><button>Check Out</button></Link>
                </div>
                {openDialog && 
                    <CheckDialog 
                        question={"Do you want to remove the product from your cart?"} 
                        onClose={setOpenDialog} 
                        onApprove={approve => approve && removeItem()}
                    />
                }
            </div>
                :
            <div className={styles.emptyCart}>
                <p>Your cart is currently empty, {!userLoggedIn && <Link to="/account/signup" className={styles.link}>sign up</Link>} {!userLoggedIn && " or"} <Link to="/shop" className={styles.link}>continue shopping</Link></p>
            </div>
            }
        </div>
    );
};

export default Cart;