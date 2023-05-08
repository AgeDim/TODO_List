import axios from "../axiosAPI";

export const getSelectedTodo = async (list, email) => {
    const {data} = await axios.get("/list/todos/get/" + email + '/' +list.id)
    return data
}