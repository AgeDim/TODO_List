import axios from "../axiosAPI";

export const getListOfToDos = async (email) => {
    const {data} = await axios.get("/lists/get/" + email)
    return data
}
export const addListOfToDos = async (email, title) => {
    const {data} = await axios.get("/lists/add/" + email + '/' + title)
    return data
}
export const deleteListOfToDos = async (email, id) => {
    const {data} = await axios.get("/lists/delete/" + email + '/'  + id)
    return data
}