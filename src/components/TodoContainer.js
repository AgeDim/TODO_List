import React, {useState, useEffect, useContext} from 'react';
import {v4 as uuidv4} from 'uuid';
import Header from './Header';
import {Redirect, Route, Switch} from 'react-router-dom';
import InputTodo from './InputTodo';
import TodosList from './TodosList';
import About from '../pages/About';
import NotMatch from '../pages/NotMatch';
import Navbar from './Navbar';
import {Context} from "../index";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import {getTodos} from "../http/TodosAPI";

const TodoContainer = () => {
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
        <>
            {user.isAuth && <Navbar/>}
            <Switch>
                <Route path="/login">
                    <LoginPage/>
                </Route>
                <Route path="/register">
                    <RegisterPage/>
                </Route>
                {user.isAuth && <Route exact path="/">
                    <div className="container">
                        <div className="inner">
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
                </Route>}{user.isAuth &&
                <Route path="/about">
                    <About/>
                </Route>}{user.isAuth &&
                <Route path="*">
                    <NotMatch/>
                </Route>}
                {user.isAuth ? <Redirect to={"/"}/> : !user.isAuth && <Redirect to={"/login"}/>}
            </Switch>
        </>
    );
};

export default TodoContainer;
