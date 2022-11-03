import {createSlice} from '@reduxjs/toolkit'

export const accessReportSlice = createSlice({
    name:'accessreports',
    initialState:{
        accessreports: [],
    },
    reducers:{
        setAccessReport : (state,action) => {
            return { ...state, accessreports: [...action.payload] };
        },
        newAccessReport : (state,action) => {
            return { ...state, accessreports: [...state.accessreports, action.payload] }
        },
        editAccessReport :(state,action) => {
            const accessreports = state.accessreports.map(accessreport =>{
                if(accessreport.id === action.payload.id){
                    accessreport=action.payload
                }
                return accessreport
            })
            return { ...state, accessreports: [...accessreports] }
        },
        deleteAccessReport : (state,action) => {
            const accessreports = state.accessreports.filter(accessreport=>
                accessreport.id !== action.payload.id)
            return { ...state, accessreports: [...accessreports] }
        }    
            
    }
})

export const {setAccessReport,newAccessReport,editAccessReport,deleteAccessReport} = accessReportSlice.actions

export default accessReportSlice.reducer