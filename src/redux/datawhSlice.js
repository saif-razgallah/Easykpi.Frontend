import { createSlice } from '@reduxjs/toolkit'

export const datawhSlice = createSlice({
    name: 'datawhs',
    initialState: {
        datawhs: [],
    },
    reducers: {
        setDataWH: (state, action) => {
            return { ...state, datawhs: [...action.payload] };
        },
        newDataWH: (state, action) => {
            return { ...state, datawhs: [...state.datawhs, action.payload] }
        },
        editDataWH: (state, action) => {
            const datawhs = state.datawhs.map(datawh => {
                if (datawh.id === action.payload.id) {
                    datawh = action.payload
                }
                return datawh
            })
            return { ...state, datawhs: [...datawhs] }
        },
        deleteDataWH: (state, action) => {
            const datawhs = state.datawhs.filter(datawh =>
                datawh.id !== action.payload.id)
            return { ...state, datawhs: [...datawhs] }
        }

    }
})

export const { setDataWH, newDataWH, editDataWH, deleteDataWH } = datawhSlice.actions

export default datawhSlice.reducer