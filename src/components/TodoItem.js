import React, {useState} from 'react';
import styles from '../css/TodoItem.module.css';
import {Collapse, Dropdown} from "@nextui-org/react";
import {FaTrash} from "react-icons/fa";

const TodoItem = (props) => {
    const [editingTitle, setEditingTitle] = useState(false);
    const [editingDeadLine, setEditingDeadLine] = useState(false);
    const [editingPriority, setEditingPriority] = useState(false);
    const [editingStatus, setEditingStatus] = useState(false);


    const handleEditingTitle = () => {
        setEditingTitle(true);
    };
    const handleEditingDeadLine = () => {
        setEditingDeadLine(true);
    };
    const handleEditingPriority = () => {
        setEditingPriority(true);
    };
    const handleEditingStatus = () => {
        setEditingStatus(true);
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
        <Collapse title={title} style={status === "Completed" ? completedStyle : null}>
            <li className={styles.item}>
                <div onDoubleClick={handleEditingTitle} style={viewModeTitle}>
                    <span style={status === "Completed" ? completedStyle : null}>{title}</span>
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
                <h3 style={{marginRight: 10}}>DeadLine:</h3>
                <div onDoubleClick={handleEditingDeadLine} style={viewModeDeadLine}>
                    <span style={status === "Completed" ? completedStyle : null}>{deadLine}</span>
                </div>
                <input
                    type="text"
                    style={editModeDeadLine}
                    className={styles.textInput}
                    value={deadLine}
                    onChange={(e) => {
                        props.setUpdate(e.target.value, 'deadLine', id);
                    }}
                    onKeyDown={handleUpdatedDone}
                />
            </li>
            <li className={styles.item}>
                <h3 style={{marginRight: 10}}>Priority:</h3>
                <div onDoubleClick={handleEditingPriority} style={viewModePriority}>
                    <span style={status === "Completed" ? completedStyle : null}>{priority}</span>
                </div>
                <input
                    type="text"
                    style={editModePriority}
                    className={styles.textInput}
                    value={priority}
                    onChange={(e) => {
                        props.setUpdate(e.target.value, 'priority', id);
                    }}
                    onKeyDown={handleUpdatedDone}
                />
            </li>
            <li className={styles.item}>
                <h3 style={{marginRight: 10}}>Status:</h3>
                <Dropdown style={status === "Completed" ? completedStyle : null} >
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
                        <Dropdown.Item key="InProcess">InProcess</Dropdown.Item>
                        <Dropdown.Item key="Completed">Completed</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </li>
            <button className="button" style={{marginTop:10, border:"none", float:"right"}} onClick={() => props.deleteTodoProps(id)}>
                <FaTrash size={30} style={{color: 'orangered', fontSize: '16px'}}/>
            </button>
        </Collapse>
    );
};

export default TodoItem;
