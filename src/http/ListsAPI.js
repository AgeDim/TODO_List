import axios from "../axiosAPI";

export const getListOfToDos = async (email) => {
    const {data} = await axios.get("/lists", {params: {email: email}})
    return data
}
export const addListOfToDos = async (email, title) => {
    const {data} = await axios.post("/lists/add", {email: email, title: title})
    return data
}
export const deleteListOfToDos = async (id) => {
    const {data} = await axios.post("/lists/delete/" + id)
    console.log(data)
    return data
}