import { createSlice, createAction } from '@reduxjs/toolkit'
export const editUserError = createAction('editUserError')
export const editPasswordError = createAction('editPasswordError')
export const editPasswordSuccess = createAction('editPasswordSuccess')

export const userSlice = createSlice({
    name: 'users',
    initialState: {
        users: [],
    },
    reducers: {
        setUser: (state, action) => {
            return { ...state, users: [...action.payload] };
        },
        newUser: (state, action) => {
            return { ...state, users: [...state.users, action.payload] }
        },
        editUser: (state, action) => {
            const users = state.users.map(user => {
                if (user.id === action.payload.id) {
                    user = action.payload
                }

                return user
            })
            return { ...state, users: [...users] }
        },
        deleteUser: (state, action) => {
            const users = state.users.filter(user =>
                user.id !== action.payload.id)
            return { ...state, users: [...users] }
        }

    }
})


export const { setUser, newUser, editUser, deleteUser } = userSlice.actions

export default userSlice.reducer