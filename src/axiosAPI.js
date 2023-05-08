import axios from "axios"
import Cookies from "js-cookie";

export default axios.create({
    baseURL: "http://localhost:8080"
})

export const $host = axios.create({
    baseURL: "http://localhost:8080"
})

const authInterceptor = config => {
    config.headers.authorization = `Bearer ${Cookies.get('token')}`
    return config
}

axios.interceptors.request.use(authInterceptor)