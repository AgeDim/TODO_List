import axios from "axios"

export default axios.create({
    baseURL: "http://localhost:8080"
})

const $host = axios.create({
    baseURL: "http://localhost:8080"
})

const authInterceptor = config => {
    config.headers.authorization = `Bearer ${localStorage.getItem('token')}`
    return config
}

$host.interceptors.request.use(authInterceptor)

export {
    $host
}