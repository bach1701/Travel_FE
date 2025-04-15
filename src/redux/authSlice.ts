import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
    user: any;
    token: string | null;
};

const initialState: AuthState = {
    user: null,
    token: localStorage.getItem("AccessToken"),
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginSuccess: (state, action: PayloadAction<{ user: any; token: string }>) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
        },
        logout: (state) => {
            state.user = null;
            state.token = null;
        },
    },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;