import { createSlice } from '@reduxjs/toolkit'


export const sessionSlice = createSlice({
    name: 'usersession',
    initialState: {
        usersession: [],
    },
    reducers: {
        setUserSession: (state, action) => {
            return { ...state, usersession: [...action.payload] };
        }


    }
})


export const { setUserSession } = sessionSlice.actions
export default sessionSlice.reducer