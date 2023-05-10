import React, {useState, useEffect, useContext} from 'react';
import {v4 as uuidv4} from 'uuid';
import Header from './Header';
import InputTodo from './InputTodo';
import TodosList from './TodosList';
import Navbar from './Navbar';
import {Context} from "../index";
import {getSelectedTodo, getTodos} from "../http/TodosAPI";
import {observer} from "mobx-react-lite";
import ListsBar from "./ListsBar";
import "../css/ToDoContainer.css"
import {getListOfToDos} from "../http/ListsAPI";

const TodoContainer = observer(() => {
    const {user} = useContext(Context)
    const [todos, setTodos] = useState([]);
    useEffect(() => {
        getListOfToDos(user.user.email).then(data => {
            user.setLists(data)
            user.setSelectedList(data[0])
        })
    }, [user.user.email])

    useEffect(()=>{
        getSelectedTodo(user.selectedList, user.user.email).then(data => {
            setTodos(data)
        })
    },[user.selectedList])

    const handleChange = (id) => {
        setTodos((prevState) => prevState.map((todo) => {
            if (todo.id === id) {
                return {
                    ...todo,
                    completed: !todo.completed,
                };
            }
            return todo;
        }));
    };

    const delTodo = (id) => {
        setTodos([
            ...todos.filter((todo) => todo.id !== id),
        ]);
    };

    const addTodoItem = (title, deadLine, priority) => {
        const newTodo = {
            id: uuidv4(),
            title,
            status: "TODO",
            deadLine: deadLine,
            priority: priority
        };
        setTodos([...todos, newTodo]);
    };

    const setUpdate = (updatedValue, type, id) => {
        setTodos(
            todos.map((todo) => {
                if (todo.id === id) {
                    switch (type) {
                        case 'title':
                            todo.title = updatedValue
                            break
                        case 'deadLine':
                            todo.deadLine = updatedValue
                            break
                        case 'priority':
                            todo.priority = updatedValue
                            break
                        case 'status':
                            todo.status = updatedValue
                            break
                    }
                }
                return todo;
            }),
        );
    };

    return (
        <div className="container">
            {user.isAuth && <Navbar/>}
            <div className="inner">
                <div className="typeBar">
                    <ListsBar/>
                </div>
                <div className="todos">
                    <Header/>
                    <InputTodo addTodoProps={addTodoItem}/>
                    <TodosList
                        todos={todos}
                        handleChangeProps={handleChange}
                        deleteTodoProps={delTodo}
                        setUpdate={setUpdate}
                    />
                </div>
            </div>
        </div>
    );
});

export default TodoContainer;
