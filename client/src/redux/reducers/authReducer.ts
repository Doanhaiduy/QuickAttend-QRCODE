import { AuthType } from '@/types/Auth';
import { createSlice } from '@reduxjs/toolkit';

const initialState: AuthType = {
    id: '',
    email: '',
    accessToken: '',
};

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        authData: initialState,
    },
    reducers: {
        setAuthData: (state, action) => {
            state.authData = action.payload;
        },
        logout: (state) => {
            state.authData = initialState;
        },
    },
});

export const authReducer = authSlice.reducer;
export const { setAuthData, logout } = authSlice.actions;

export const authSelector = (state: any) => state.authReducer.authData;
