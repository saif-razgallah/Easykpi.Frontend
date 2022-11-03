import { setDashboard, newDashboard, deleteDashboard } from '../redux/dashboardSlice';
import * as axios from 'axios'


const axiosInstance = axios.create({
    baseURL: 'https://localhost:5001/Dashboard',
})

axiosInstance.interceptors.request.use((config) => {
    config.headers = { authorization: 'Bearer ' + sessionStorage.getItem('token') };
    return config;
});


export const GetDashboard = async (dispatch) => {
    try {
        // api call
        const { data } = await axiosInstance.get()
        console.log(data)
        dispatch(setDashboard(data));

    } catch {
        console.log('Error !')
    }
}


export const NewDashboard = async (dispatch, dashboard) => {
    try {

        //api call
        const { data } = await axiosInstance.post('', dashboard)
        dispatch(newDashboard(data));

    } catch {
        console.log('Error !')
    }
}



export const DeleteDashboard = async (dispatch, dashboard) => {
    try {

        //api call
        await axiosInstance.delete(`/${dashboard.id}`)
        dispatch(deleteDashboard(dashboard));

    } catch {
        console.log('Error !')
    }
}