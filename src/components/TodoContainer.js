import React, {useState, useEffect, useContext} from 'react';
import {v4 as uuidv4} from 'uuid';
import Header from './Header';
import InputTodo from './InputTodo';
import TodosList from './TodosList';
import Navbar from './Navbar';
import {Context} from "../index";
import {getTodos} from "../http/TodosAPI";
import {observer} from "mobx-react-lite";
import ListsBar from "./ListsBar";
import "../css/ToDoContainer.css"

const TodoContainer = observer(() => {
    const {user} = useContext(Context)
    const [todos, setTodos] = useState([]);
    useEffect(() => {
        getTodos(user.user.email).then(data => {
            setTodos(data)
        })
    }, [user.user.email])

    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos));
    }, [todos]);

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

    const addTodoItem = (title) => {
        const newTodo = {
            id: uuidv4(),
            title,
            completed: false,
        };
        setTodos([...todos, newTodo]);
    };

    const setUpdate = (updatedTitle, id) => {
        setTodos(
            todos.map((todo) => {
                if (todo.id === id) {
                    todo.title = updatedTitle;
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
