import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: "user",
    initialState: {
        isLoggedIn: false,
        user: {}
    },
    reducers: {
        setIsLoggedIn: (state, action) => {state.isLoggedIn = action.payload},
        setUser: (state, action) => {state.user = action.payload},
        clearUser: (state) => {state.user = null}
    },
});

export const { setIsLoggedIn, setUser, clearUser } = userSlice.actions;

export const selectIsLoggedIn = (state) => state.user.isLoggedIn;
export const selectUser = (state) => state.user.user;

export default userSlice.reducer;