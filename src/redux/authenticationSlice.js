import { createSlice, createAction } from '@reduxjs/toolkit';

export const loginError = createAction('loginError')

export const authenticationSlice = createSlice({
    name: 'authentication',
    initialState: {
        token: '',
        username: '',
        userId: '',
        isLoggedIn: false,
    },
    reducers: {
        userAuthenticated: (state, action) => {
            sessionStorage.setItem('token', action.payload.token);
            sessionStorage.setItem('username', action.payload.username);
            sessionStorage.setItem('userId', action.payload.userId);
            return {
                ...state, ...{
                    token: action.payload.token,
                    username: action.payload.username,
                    userId: action.payload.userId,
                    isLoggedIn: true,
                }
            }
        },
        logout: () => {
            sessionStorage.clear();
        }
    }
});


export const { userAuthenticated, logout } = authenticationSlice.actions;

export default authenticationSlice.reducer;