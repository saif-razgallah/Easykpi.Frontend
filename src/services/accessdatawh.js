import { setAccessDatawh, newAccessDatawh, editAccessDatawh, deleteAccessDatawh } from '../redux/accessDatawhSlice';

import * as axios from 'axios'


const axiosInstance = axios.create({
    baseURL: 'https://localhost:5001/AccessDatawh',
})

axiosInstance.interceptors.request.use((config) => {
    config.headers = { authorization: 'Bearer ' + sessionStorage.getItem('token') };
    return config;
});

export const GetAccessDatawh = async (dispatch) => {
    try {
        // api call
        const { data } = await axiosInstance.get()
        console.log(data)
        dispatch(setAccessDatawh(data));

    } catch {
        console.log('Error !')
    }
}


export const NewAccessDatawh = async (dispatch, accessdatawh) => {
    try {

        //api call
        console.log("service")
        console.log(accessdatawh)
        const { data } = await axiosInstance.post('', accessdatawh)
        dispatch(newAccessDatawh(data));

    } catch {
        console.log('Error !')
    }
}


export const EditAccessDatawh = async (dispatch, accessdatawh) => {
    try {

        //api call
        await axiosInstance.put('', accessdatawh)
        dispatch(editAccessDatawh(accessdatawh));

    } catch {
        console.log('Error !')
    }
}


export const DeleteAccessDatawh = async (dispatch, accessdatawh) => {
    try {

        //api call
        await axiosInstance.delete(`/${accessdatawh.id}`)
        dispatch(deleteAccessDatawh(accessdatawh));

    } catch {
        console.log('Error !')
    }
}