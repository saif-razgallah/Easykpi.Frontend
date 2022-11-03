import { setReport, newReport, editReport, deleteReport } from '../redux/reportSlice';
import * as axios from 'axios'

export const getStatusCollection = () => ([
    { id: 'Initié', title: 'Initié' },
    { id: 'En cours', title: 'En cours' },
    { id: 'Fermé', title: 'Fermé' },
])


const axiosInstance = axios.create({
    baseURL: 'https://localhost:5001/Reports',
})

axiosInstance.interceptors.request.use((config) => {
    config.headers = { authorization: 'Bearer ' + sessionStorage.getItem('token') };
    return config;
});

export const GetReport = async (dispatch) => {
    try {
        // api call
        const { data } = await axiosInstance.get()
        dispatch(setReport(data));

    } catch {
        console.log('Error !')
    }
}


export const NewReport = async (dispatch, report) => {
    try {

        //api call
        const { data } = await axiosInstance.post('', report)
        dispatch(newReport(data));

    } catch {
        console.log('Error !')
    }
}


export const EditReport = async (dispatch, report) => {
    try {

        //api call
        await axiosInstance.put('', report)
        dispatch(editReport(report));

    } catch {
        console.log('Error !')
    }
}


export const DeleteReport = async (dispatch, report) => {
    try {

        //api call
        await axiosInstance.delete(`/${report.id}`)
        dispatch(deleteReport(report));

    } catch {
        console.log('Error !')
    }
}