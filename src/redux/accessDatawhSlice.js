import {createSlice} from '@reduxjs/toolkit'

export const accessDatawhSlice = createSlice({
    name:'accessdatawhs',
    initialState:{
        accessdatawhs: [],
    },
    reducers:{
        setAccessDatawh : (state,action) => {
            return { ...state, accessdatawhs: [...action.payload] };
        },
        newAccessDatawh : (state,action) => {
            return { ...state, accessdatawhs: [...state.accessdatawhs, action.payload] }
        },
        editAccessDatawh :(state,action) => {
            const accessdatawhs = state.accessdatawhs.map(accessdatawh =>{
                if(accessdatawh.id === action.payload.id){
                    accessdatawh=action.payload
                }
                return accessdatawh
            })
            return { ...state, accessdatawhs: [...accessdatawhs] }
        },
        deleteAccessDatawh : (state,action) => {
            const accessdatawhs = state.accessdatawhs.filter(accessdatawh=>
                accessdatawh.id !== action.payload.id)
            return { ...state, accessdatawhs: [...accessdatawhs] }
        }    
            
    }
})

export const {setAccessDatawh,newAccessDatawh,editAccessDatawh,deleteAccessDatawh} = accessDatawhSlice.actions

export default accessDatawhSlice.reducer