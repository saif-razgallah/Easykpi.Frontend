import { createSlice } from '@reduxjs/toolkit'

export const reportSlice = createSlice({
    name: 'reports',
    initialState: {
        reports: [],
    },
    reducers: {
        setReport: (state, action) => {
            return { ...state, reports: [...action.payload] };
        },
        newReport: (state, action) => {
            return { ...state, reports: [...state.reports, action.payload] }
        },
        editReport: (state, action) => {
            const reports = state.reports.map(report => {
                if (report.id === action.payload.id) {
                    report = action.payload
                }
                return report
            })
            return { ...state, reports: [...reports] }
        },
        deleteReport: (state, action) => {
            const reports = state.reports.filter(report =>
                report.id !== action.payload.id)
            return { ...state, reports: [...reports] }
        }

    }
})


export const { setReport, newReport, editReport, deleteReport } = reportSlice.actions

export default reportSlice.reducer