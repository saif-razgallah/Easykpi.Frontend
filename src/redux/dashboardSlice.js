import { createSlice } from '@reduxjs/toolkit'

export const dashboardSlice = createSlice({
    name: 'dashboards',
    initialState: {
        dashboards: [],
    },
    reducers: {
        setDashboard: (state, action) => {
            return { ...state, dashboards: [...action.payload] };
        },
        newDashboard: (state, action) => {
            return { ...state, dashboards: [...state.dashboards, action.payload] }
        },
        deleteDashboard: (state, action) => {
            const dashboards = state.dashboards.filter(dashboard =>
                dashboard.id !== action.payload.id)
            return { ...state, dashboards: [...dashboards] }
        }

    }
})

export const { setDashboard, newDashboard, deleteDashboard } = dashboardSlice.actions

export default dashboardSlice.reducer