import { setUser,newUser,editUser,deleteUser,editUserError } from '../redux/userSlice';
import * as axios from 'axios'

//

export const getRoleCollection = () => ([
    { id: 'Administrateur', title: 'Administrateur' },
    { id: 'Concepteur', title: 'Concepteur' },
    { id: 'Gestionnaire', title: 'Gestionnaire' },
    { id: 'Invite', title: 'Invite' },
])


export const getGender = () => ([
    { id: 'homme', title: 'Homme' },
    { id: 'femme', title: 'Femme' },
])
//
const axiosInstance = axios.create({
    baseURL: 'https://localhost:5001/Users',
})


axiosInstance.interceptors.request.use((config) => {
    config.headers = { authorization: 'Bearer ' + sessionStorage.getItem('token') };
    return config;
});


export const GetUsers = async (dispatch) => {
    try {
        // api call
        const { data } = await axiosInstance.get()
        dispatch(setUser(data));

    } catch {
        console.log('Error !')
    }
}


export const NewUser = async (dispatch, user) => {
    try {

        //api call
        const { data } = await axiosInstance.post('', user )
        dispatch(newUser(data));

    } catch {
        console.log('Error !')
    }
}




export const EditUser = async (dispatch, user) => {
    try {

        //api call
        await axiosInstance.put('',user)
        dispatch(editUser(user));

    } catch {
        //console.log('Error !')
        dispatch(editUserError())
    }
}


export const DeleteUser = async (dispatch, user) => {
    try {

        //api call
        await axiosInstance.delete(`/${user.id}`)
        dispatch(deleteUser(user));

    } catch {
        console.log('Error !')
    }
}