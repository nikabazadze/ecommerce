import { addCartItem } from "../API";

export const checkGuestCart = async (userId) => {
    const guestCart = JSON.parse(localStorage.getItem('guestCart') || '{}');
    if (Object.keys(guestCart).length > 0) {
        try {
            for (const cartItem of guestCart.cartItems) {
                await addCartItem(userId, cartItem.productId, cartItem.productVariant, cartItem.productQuantity);
            }
            localStorage.removeItem('guestCart');
        } catch (err) {
            console.log(err);
        }
    }
};