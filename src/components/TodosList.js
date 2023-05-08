import React from 'react';
import TodoItem from './TodoItem';
import "../css/ToDoList.css"

const TodosList = (props) => (
    <ul className="scroll">
        {props.todos.map((todo) => (
            <TodoItem
                key={todo.id}
                todo={todo}
                handleChangeProps={props.handleChangeProps}
                deleteTodoProps={props.deleteTodoProps}
                setUpdate={props.setUpdate}
            />
        ))}
    </ul>
);

export default TodosList;
