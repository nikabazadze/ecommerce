import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getProducts } from "../API";

// Fetches all products
export const loadProducts = createAsyncThunk(
    "products/loadProducts",
    getProducts
);

export const productsSlice = createSlice({
    name: "products",
    initialState: {
        products: [],
        productsAreLoading: false,
        productsHaveError: false
    },
    reducers: {},
    extraReducers: {
        [loadProducts.pending]: (state, action) => {
            state.productsAreLoading = true;
            state.productsHaveError = false;
        },
        [loadProducts.fulfilled]: (state, action) => {
            state.products = action.payload;
            state.productsAreLoading = false;
            state.productsHaveError = false;
        },
        [loadProducts.rejected]: (state, action) => {
            state.productsAreLoading = false;
            state.productsHaveError = true;
        }
    }
});

export const selectProducts = (state) => state.products.products;
export const selectProductsAreLoading = (state) => state.products.productsAreLoading;
export const selectProductsHaveError = (state) => state.products.productsHaveError;

export const selectProductById = (id) => {
    return (state) => state.products.products.find(product => product.id === parseInt(id));
};

export const selectProdoctColors = (id) => {
    return (state) => {
        const selector = selectProductById(id);
        const product = selector(state);
        const result = [];
        product.productVariants.forEach(variant => {
            const color = {
                name: variant.colorName,
                code: variant.colorCode
            };
            result.push(color);
        });

        return result;
    }
};

export default productsSlice.reducer;