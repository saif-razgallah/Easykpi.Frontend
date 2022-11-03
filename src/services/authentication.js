import { userAuthenticated, loginError } from '../redux/authenticationSlice';
import * as axios from 'axios';

const axiosInstance = axios.create({
    //baseURL: `${process.env.REACT_APP_BASE_URL}/Authentication`,
    baseURL: 'https://localhost:5001/Authentication',
});


export const SignUp = async (dispatch, credentials) => {
    try {
        // api call
        const { data } = await axiosInstance.post('/signup', credentials);
        dispatch(userAuthenticated(data));
    } catch {
        console.log('Error!');
    }
}


export const SignIn = async (dispatch, credentials) => {
    try {
        // api call
        const { data } = await axiosInstance.post('/signin', credentials);
        dispatch(userAuthenticated(data));
    } catch {
        dispatch(loginError())
    }
}