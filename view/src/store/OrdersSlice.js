import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getUserOrders } from "../API";

export const loadUserOrders = createAsyncThunk(
    'orders/loadUserOrders',
    getUserOrders
);

export const ordersSlice = createSlice({
    name: "orders",
    initialState: {
        orders: [],
        ordersAreLoading: false,
        ordersHaveError: false,
    },
    reducers: {
        clearOrders: (state) => {state.orders = []}
    },
    extraReducers: {
        [loadUserOrders.pending]: (state, action) => {
            state.ordersAreLoading = true;
            state.ordersHaveError = false;
        },
        [loadUserOrders.fulfilled]: (state, action) => {
            state.orders = action.payload;
            state.ordersAreLoading = false;
            state.ordersHaveError = false;
        },
        [loadUserOrders.rejected]: (state, action) => {
            state.ordersAreLoading = false;
            state.ordersHaveError = true;
        },
    }
});

export const { clearOrders } = ordersSlice.actions;

export const selectOrders = (state) => state.orders.orders;
export const selectOrdersAreLoading = (state) => state.orders.ordersAreLoading;
export const selectOrdersHaveError = (state) => state.orders.ordersHaveError;

export default ordersSlice.reducer;