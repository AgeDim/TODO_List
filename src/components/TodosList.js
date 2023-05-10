import React from 'react';
import TodoItem from './TodoItem';
import {Collapse} from "@nextui-org/react";
import "../css/ToDoList.css"

const TodosList = (props) => (
    <ul className="scroll">
        <Collapse.Group bordered>
            {props.todos.map((todo) => (
                <TodoItem
                    key={todo.id}
                    todo={todo}
                    handleChangeProps={props.handleChangeProps}
                    deleteTodoProps={props.deleteTodoProps}
                    setUpdate={props.setUpdate}
                />
            ))}
        </Collapse.Group>
    </ul>
);

export default TodosList;
