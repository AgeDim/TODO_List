import axios from "../axiosAPI";

export const getSelectedTodo = async (list) => {
    const {data} = await axios.get("/lists/tasks", {params: {id: list.id}})
    return data
}