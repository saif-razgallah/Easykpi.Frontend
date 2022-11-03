import { setUserSession } from '../redux/sessionSlice';
import * as axios from 'axios'

const axiosInstance = axios.create({
    baseURL: 'https://localhost:5001/Profile',
})


axiosInstance.interceptors.request.use((config) => {
    config.headers = { authorization: 'Bearer ' + sessionStorage.getItem('token') };
    return config;
});

export const GetUserSession = async (dispatch) => {
    try {
        // api call
        //const usersession = JSON.parse(sessionStorage.getItem('usersession'));
        const userId = sessionStorage.getItem('userId');
        console.log(userId)
        const { data } = await axiosInstance.get(`/${userId}`)
        dispatch(setUserSession(data));

    } catch {
        console.log('Error !')
    }
}

// export const GetUserSession = async (dispatch) => {
//     try {
//         // api call
//         console.log('usersession')
//         const usersession = JSON.parse(sessionStorage.getItem('usersession'));
//         const username = sessionStorage.getItem('username');

//         console.log(username)
//         const { data } = await axiosInstance.get(`/${username}`)
//         console.log(data)
//         dispatch(setUserSession(data));

//     } catch {
//         console.log('Error !')
//     }
// }
