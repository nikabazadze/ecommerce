import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getUserCart } from "../API";
import { roundToTwoDecimalPlaces } from "../utils/numberConversion";

export const loadUserCart = createAsyncThunk(
    'user/loadUserCart',
    getUserCart
);

export const userSlice = createSlice({
    name: "user",
    initialState: {
        isLoggedIn: false,
        user: {},
        cart: {},
        cartIsLoading: false,
        cartHasError: false,
    },
    reducers: {
        setIsLoggedIn: (state, action) => {state.isLoggedIn = action.payload},
        setUser: (state, action) => {state.user = action.payload},
        clearUser: (state) => {state.user = null},
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

export const { setIsLoggedIn, setUser, clearUser, updateCartItemQuantity } = userSlice.actions;

export const selectIsLoggedIn = (state) => state.user.isLoggedIn;
export const selectUser = (state) => state.user.user;
export const selectCart = (state) => state.user.cart;
export const selectCartIsLoading = (state) => state.user.cartIsLoading;
export const selectCartHasError = (state) => state.user.cartHasError;

export default userSlice.reducer;