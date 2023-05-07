import axios from "../axiosAPI";

export const getTodos = async (email) => {
    const {data} = await axios.get("/todos/"+ email)
    return data
}