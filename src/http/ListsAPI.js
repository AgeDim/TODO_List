import axios from "../axiosAPI";

export const getListOfToDos = async (email) => {
    const {data} = await axios.get("/lists/get/", {params: {email: email}})
    return data
}
export const addListOfToDos = async (email, title) => {
    const {data} = await axios.post("/lists/add/", {email: email, title: title})
    return data
}
export const deleteListOfToDos = async (email, id) => {
    const {data} = await axios.get("/lists/delete/", {params: {email: email, id: id}})
    return data
}