import axios from "../axiosAPI";

export const getSelectedTodo = async (list) => {
    const {data} = await axios.get("/lists/tasks", {params: {id: list.id}})
    return data
}

export const addTodo = async (todo, listId) => {
    const {data} = await axios.post("/lists/tasks/add", {
        name: todo.title,
        deadline: todo.deadLine,
        status: todo.status,
        priority: todo.priority,
        listId: listId
    })
    return data

}