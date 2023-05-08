import jwt_decode from "jwt-decode";
import {$host} from "../axiosAPI";
import Cookies from 'js-cookie';


export const register = async (email, password) => {
    const response = await $host.post('/register', {email, password})
    Cookies.set('token', response.data);
    return jwt_decode(response.data)
}

export const login = async (email, password) => {
    const response = await $host.post('/login', {email, password})
    Cookies.set('token', response.data);
    return jwt_decode(response.data)
}

export const check = async () => {
    const response = await $host.get('/check')
    if (response.data !== "LOGOUT") {
        Cookies.get('token', response.data);
        return jwt_decode(response.data)
    } else {
        Cookies.set('token', '');
    }
}