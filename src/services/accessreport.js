import { setAccessReport, newAccessReport, editAccessReport, deleteAccessReport } from '../redux/accessReportSlice';
import * as axios from 'axios'


const axiosInstance = axios.create({
    baseURL: 'https://localhost:5001/AccessReport',
})

axiosInstance.interceptors.request.use((config) => {
    config.headers = { authorization: 'Bearer ' + sessionStorage.getItem('token') };
    return config;
});


export const GetAccessReport = async (dispatch) => {
    try {
        // api call
        const { data } = await axiosInstance.get()
        console.log(data)
        dispatch(setAccessReport(data));

    } catch {
        console.log('Error !')
    }
}


export const NewAccessReport = async (dispatch, accessreport) => {
    try {

        //api call
        console.log("service")
        console.log(accessreport)
        const { data } = await axiosInstance.post('', accessreport)
        dispatch(newAccessReport(data));

    } catch {
        console.log('Error !')
    }
}


export const EditAccessReport = async (dispatch, accessreport) => {
    try {

        //api call
        await axiosInstance.put('', accessreport)
        dispatch(editAccessReport(accessreport));

    } catch {
        console.log('Error !')
    }
}


export const DeleteAccessReport = async (dispatch, accessreport) => {
    try {

        //api call
        await axiosInstance.delete(`/${accessreport.id}`)
        dispatch(deleteAccessReport(accessreport));

    } catch {
        console.log('Error !')
    }
}