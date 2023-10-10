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
            const { productId, newQuantity } = action.payload;
            state.cart.cartItems.forEach(item => {
                if (item.productId === productId) {
                    const diff = newQuantity - item.productQuantity;
                    item.productQuantity = newQuantity;
                    state.cart.totalValue = roundToTwoDecimalPlaces(parseFloat(state.cart.totalValue) + (diff * item.unitPrice));
                }
            });
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

export const { updateCartItemQuantity } = cartSlice.actions;

export const selectCart = (state) => state.cart.cart;
export const selectCartIsLoading = (state) => state.cart.cartIsLoading;
export const selectCartHasError = (state) => state.cart.cartHasError;

export default cartSlice.reducer;