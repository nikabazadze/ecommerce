import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import styles from './ChosenProducts.module.css';
import minusIcon from "./icons/minusIcon.svg";
import plusIcon from "./icons/plusIcon.svg";
import trashIcon from "./icons/trashIcon.svg";

import Badge from "../Badge";
import CheckDialog from "../../components/CheckDialog";
import { selectUser, selectIsLoggedIn } from "../../store/UserSlice";
import { loadGuestCart, selectCart, selectCartIsLoading, selectCartHasError, updateCartItemQuantity, removeCartItem } from "../../store/CartSlice";
import { updateCartItem, deleteCartItem } from "../../API";
import { roundToTwoDecimalPlaces } from "../../utils/numberConversion";

function ChosenProducts({ products, allowUpdate }) {
    const dispatch = useDispatch();
    const userLoggedIn = useSelector(selectIsLoggedIn);
    const user = useSelector(selectUser);
    const cart = useSelector(selectCart);
    const cartIsLoading = useSelector(selectCartIsLoading);
    const cartHasError = useSelector(selectCartHasError);
    const [ openDialog, setOpenDialog ] = useState(false);
    const [ removeProductId, setRemoveProductId ] = useState(null);
    const [ removeProductVariant, setRemoveProductVariant ] = useState(null);

    const handleItemUpdate = async (productId, variant, newQuantity) => {
        if (newQuantity === 0) {
            handleItemRemove(productId, variant);
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
        products.map((product, index) => (
            <div className={styles.mainContainer} style={index === 0 ? {borderTop: 0, paddingTop: 0} : {}} key={`${product.productId}_${product.productVariant}`}>
                <div className={styles.imgOuterContainer}>
                    <div className={styles.imgContainer} style={!allowUpdate ? {border: "1px solid #d8d8d8"} : {}}>
                        <img src={product.imgUrl} alt="Product image" />
                    </div>
                    {!allowUpdate && <Badge count={product.productQuantity} />}
                </div>
                <div className={styles.productMetaContainer}>
                    <div>
                        <p>{product.productName}</p>
                        <span>{product.colorName}</span>
                        {allowUpdate && 
                            <div className={styles.quantityContainer}>
                                <div className={styles.quantityChanger}>
                                    {product.productQuantity === 1 ? 
                                    <img src={trashIcon} className={styles.trashIcon} onClick={() => handleItemRemove(product.productId, product.productVariant)} alt='trash icon'/> 
                                    : 
                                    <img src={minusIcon} className={styles.minusIcon} onClick={() => handleItemUpdate(product.productId, product.productVariant, product.productQuantity -1)} alt='minus icon'/>
                                    }
                                    <p>{product.productQuantity}</p>
                                    <img src={plusIcon} className={styles.plusIcon} onClick={() => handleItemUpdate(product.productId, product.productVariant, product.productQuantity + 1)} alt='plus icon'/>
                                </div>
                                <span>|</span>
                                <span onClick={() => handleItemRemove(product.productId, product.productVariant)} >Delete</span>
                                {openDialog && 
                                    <CheckDialog 
                                        question={"Do you want to remove the product from your cart?"} 
                                        onClose={setOpenDialog} 
                                        onApprove={approve => approve && removeItem()}
                                    />
                                }
                            </div>
                        }
                    </div>
                    <p className={styles.price}>${product.unitPrice}</p>
                </div>
            </div>
        ))
    );
};

export default ChosenProducts;