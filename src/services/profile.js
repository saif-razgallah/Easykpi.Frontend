import { editUser, editUserError, editPasswordError, editPasswordSuccess } from '../redux/userSlice';

import * as axios from 'axios'

const axiosInstance = axios.create({
    baseURL: 'https://localhost:5001/Profile',
})


axiosInstance.interceptors.request.use((config) => {
    config.headers = { authorization: 'Bearer ' + sessionStorage.getItem('token') };
    return config;
});


export const EditProfile = async (dispatch, user) => {
    try {

        await axiosInstance.put('/Profile', user)
        dispatch(editUser(user));

    } catch {
        console.log('Error profil')
        dispatch(editUserError())
    }
}

export const EditPassword = async (dispatch, user) => {
    try {
        await axiosInstance.put('/Password', user)
        dispatch(editPasswordSuccess())

    } catch {
        console.log('Error profile')
        dispatch(editPasswordError())
    }
}

export const EditImage = async (dispatch, user) => {
    try {
        await axiosInstance.put('/Image', user)
        dispatch(editUser(user));

    } catch {
        console.log('Error Image')
    }
}
