import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getUserCart } from "../API";
import { roundToTwoDecimalPlaces } from "../utils/numberConversion";

export const loadUserCart = createAsyncThunk(
    'user/loadUserCart',
    getUserCart
);

export const cartSlice = createSlice({
    name: "cart",
    initialState: {
        cart: {},
        cartIsLoading: false,
        cartHasError: false,
    },
    reducers: {
        updateCartItemQuantity: (state, action) => {
            const { productId, variant, newQuantity } = action.payload;
            state.cart.cartItems.forEach(item => {
                if (item.productId === productId && item.productVariant === variant) {
                    const diff = newQuantity - item.productQuantity;
                    item.productQuantity = newQuantity;
                    state.cart.totalValue = roundToTwoDecimalPlaces(parseFloat(state.cart.totalValue) + (diff * item.unitPrice));
                }
            });
        },
        removeCartItem: (state, action) => {
            const { productId, variant } = action.payload;
            const item = state.cart.cartItems.find(item => (item.productId === productId && item.productVariant === variant));
            state.cart.totalValue = roundToTwoDecimalPlaces(state.cart.totalValue - (item.unitPrice * item.productQuantity));
            state.cart.cartItems = state.cart.cartItems.filter(item => !(item.productId === productId && item.productVariant === variant));
        },
        loadGuestCart: (state, action) => {state.cart = action.payload},
        clearCart: (state) => {
            state.cart.totalValue = 0;
            state.cart.cartItems = [];
        }
    },
    extraReducers: {
        [loadUserCart.pending]: (state, action) => {
            state.cartIsLoading = true;
            state.cartHasError = false;
        },
        [loadUserCart.fulfilled]: (state, action) => {
            state.cart = action.payload;
            state.cartIsLoading = false;
            state.cartHasError = false;
        },
        [loadUserCart.rejected]: (state, action) => {
            state.cartIsLoading = false;
            state.cartHasError = true;
        },
    }
});

export const { updateCartItemQuantity, removeCartItem, addGuestCartItem, loadGuestCart, clearCart } = cartSlice.actions;

export const selectCart = (state) => state.cart.cart;
export const selectCartIsLoading = (state) => state.cart.cartIsLoading;
export const selectCartHasError = (state) => state.cart.cartHasError;
export const selectCartTotalItems = (state) => {
    let result = 0;

    if (Object.keys(state.cart.cart).length > 0) {
        for (const item of state.cart.cart.cartItems) {
            result += item.productQuantity;
        }
    }

    return result;
};

export default cartSlice.reducer;