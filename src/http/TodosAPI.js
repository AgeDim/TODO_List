import axios from "../axiosAPI";
import {toast} from "react-toastify";

export const getSelectedTodo = async (list) => {
    if(list.id !== undefined){
    const {data} = await axios.get("/lists/tasks", {params: {id: list.id}})
    return data}
}

export const addTodo = async (todo, listId) => {
    const {data} = await axios.post("/lists/tasks/add", {
        name: todo.title,
        deadline: todo.deadLine.toLocaleString().split(',')[0],
        status: todo.status,
        priority: todo.priority.toUpperCase(),
        listId: listId
    })
    return data

}

export const updateTodo = async (todo, listId) => {
    const date = todo.deadline.toLocaleString().split(',')[0].split('/')
    const {data} = await axios.post("/lists/tasks/change/" + todo.id, {
        name: todo.name,
        deadline: date[1] + "/" + date[0] + "/" + date[2],
        status: todo.status,
        priority: todo.priority.toUpperCase(),
        listId: listId
    })
    return data

}

export const deleteTodo = async (id) => {
    const {data} = await axios.post("/lists/tasks/delete/" + id)
    toast(data)
}