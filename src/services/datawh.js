import { setDataWH, newDataWH, editDataWH, deleteDataWH } from '../redux/datawhSlice';
import * as axios from 'axios'

export const getStatusCollection = () => ([
    { id: 'Initié', title: 'Initié' },
    { id: 'En cours', title: 'En cours' },
    { id: 'Fermé', title: 'Fermé' },
])


const axiosInstance = axios.create({
    baseURL: 'https://localhost:5001/DataWH',
})

axiosInstance.interceptors.request.use((config) => {
    config.headers = { authorization: 'Bearer ' + sessionStorage.getItem('token') };
    return config;
});


export const GetDataWH = async (dispatch) => {
    try {
        // api call
        const { data } = await axiosInstance.get()
        console.log("service users");
        console.log(data);
        dispatch(setDataWH(data));

    } catch {
        console.log('Error !')
    }
}


export const NewDataWH = async (dispatch, datawh) => {
    try {

        //api call
        console.log("newdatawh")
        const { data } = await axiosInstance.post('', datawh)
        dispatch(newDataWH(data));

    } catch {
        console.log('Error !')
    }
}


export const EditDataWH = async (dispatch, datawh) => {
    try {

        //api call
        await axiosInstance.put('', datawh)
        dispatch(editDataWH(datawh));

    } catch {
        console.log('Error !')
    }
}


export const DeleteDataWH = async (dispatch, datawh) => {
    try {

        //api call
        await axiosInstance.delete(`/${datawh.id}`)
        dispatch(deleteDataWH(datawh));

    } catch {
        console.log('Error !')
    }
}