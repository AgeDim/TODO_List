import React, {useContext, useEffect, useState} from 'react';
import styles from '../css/TodoItem.module.css';
import {Collapse, Dropdown, Button} from "@nextui-org/react";
import {FaTrash} from "react-icons/fa";
import DatePicker from "react-datepicker"
import 'react-datepicker/dist/react-datepicker.css'
import {updateTodo} from "../http/TodosAPI";
import {Context} from "../index";

const TodoItem = (props) => {
    const [editingTitle, setEditingTitle] = useState(false);
    const [editingDeadLine, setEditingDeadLine] = useState(false);
    const [editingPriority, setEditingPriority] = useState(false);
    const [editingStatus, setEditingStatus] = useState(false);
    const [valueChanges, setValueChanges] = useState(true)
    const {user} = useContext(Context)

    const handleEditingTitle = () => {
        setEditingTitle(true);
    };
    const handleUpdatedDone = (event) => {
        if (event.key === 'Enter') {
            setEditingTitle(false);
            setEditingDeadLine(false);
            setEditingPriority(false);
            setEditingStatus(false)
        }
    };

    const completedStyle = {
        fontStyle: 'italic',
        color: '#595959',
        opacity: 0.4,
        textDecoration: 'line-through',
    };

    const {status, id, title, deadLine, priority} = props.todo;
    const [initialState, setInitialState] = useState({
        status: props.todo.status,
        title: props.todo.title,
        deadLine: props.todo.deadLine,
        priority: props.todo.priority,
    });
    useEffect(() => {
        if (initialState.status !== status || initialState.priority !== priority || initialState.title !== title || initialState.deadLine !== deadLine) {
            setValueChanges(false)
        } else {
            setValueChanges(true)
        }
    }, [status, title, deadLine, priority])
    const viewModeTitle = {};
    const editModeTitle = {};
    const viewModeDeadLine = {marginTop: 3};
    const editModeDeadLine = {};
    const viewModePriority = {marginTop: 3};
    const editModePriority = {};
    const viewModeStatus = {marginTop: 3};
    const editModeStatus = {};

    if (editingTitle) {
        viewModeTitle.display = 'none';
    } else {
        editModeTitle.display = 'none';
    }
    if (editingDeadLine) {
        viewModeDeadLine.display = 'none';
    } else {
        editModeDeadLine.display = 'none';
    }
    if (editingPriority) {
        viewModePriority.display = 'none';
    } else {
        editModePriority.display = 'none';
    }
    if (editingStatus) {
        viewModeStatus.display = 'none';
    } else {
        editModeStatus.display = 'none';
    }

    return (
        <Collapse title={title} style={status === "COMPLETED" ? completedStyle : null}>
            <li className={styles.item}>
                <div className={styles.item} onDoubleClick={handleEditingTitle} style={viewModeTitle}>
                    <h3 style={{marginRight:10}}>Name: </h3>
                    <span style={status === "COMPLETED" ? completedStyle : null}>{title}</span>
                </div>
                <input
                    type="text"
                    style={editModeTitle}
                    className={styles.textInput}
                    value={title}
                    onChange={(e) => {
                        props.setUpdate(e.target.value, 'title', id)
                    }}
                    onKeyDown={handleUpdatedDone}
                />
            </li>
            <li className={styles.item}>
                <h3 style={{marginRight: 10}}>Priority:</h3>
                <Dropdown style={status === "COMPLETED" ? completedStyle : null}>
                    <Dropdown.Button flat color="black" css={{tt: "capitalize"}}>
                        {priority}
                    </Dropdown.Button>
                    <Dropdown.Menu
                        aria-label="Single selection actions"
                        color="secondary"
                        disallowEmptySelection
                        selectionMode="single"
                        selectedKeys={priority}
                        onSelectionChange={(e) => {
                            props.setUpdate(e.anchorKey, 'priority', id);
                        }}
                    >
                        <Dropdown.Item key="HIGH">HIGH</Dropdown.Item>
                        <Dropdown.Item key="MEDIUM">MEDIUM</Dropdown.Item>
                        <Dropdown.Item key="LOW">LOW</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </li>
            <li className={styles.item}>
                <h3 style={{marginRight: 10}}>Status:</h3>
                <Dropdown style={status === "COMPLETED" ? completedStyle : null}>
                    <Dropdown.Button flat color="black" css={{tt: "capitalize"}}>
                        {status}
                    </Dropdown.Button>
                    <Dropdown.Menu
                        aria-label="Single selection actions"
                        color="secondary"
                        disallowEmptySelection
                        selectionMode="single"
                        selectedKeys={status}
                        onSelectionChange={(e) => {
                            props.setUpdate(e.anchorKey, 'status', id);
                        }}
                    >
                        <Dropdown.Item key="TODO">TODO</Dropdown.Item>
                        <Dropdown.Item key="IN_PROGRESS">IN_PROGRESS</Dropdown.Item>
                        <Dropdown.Item key="COMPLETED">COMPLETED</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </li>
            <li className={styles.item}>
                <h3 style={{marginRight: 10}}>DeadLine:</h3>
                <DatePicker dateFormat="dd.MM.yyyy" selected={new Date(deadLine)} onChange={(date) => {
                    props.setUpdate(date.toLocaleString().split(',')[0], 'deadLine', id)
                }}/>
            </li>
            <button className="button" style={{marginTop: 10, border: "none", float: "right"}}
                    onClick={() => props.deleteTodoProps(id)}>
                <FaTrash size={30} style={{color: 'orangered', fontSize: '16px'}}/>
            </button>
            <Button shadow color="success" disabled={valueChanges} style={{
                marginTop: 10,
                border: "none",
                marginLeft: 10
            }} auto onPress={() => {updateTodo({
                id: id,
                name: title,
                deadline: deadLine,
                status: status,
                priority: priority
            }, user.selectedList.id); setValueChanges(true); setInitialState({status: status,
                title: title,
                deadLine: deadLine,
                priority: priority})}}>
                Success
            </Button>
        </Collapse>
    );
};

export default TodoItem;
