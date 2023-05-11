import React, {useContext, useState} from 'react';
import {observer} from "mobx-react-lite";
import Modal from "react-bootstrap/Modal";
import {Button, Form} from "react-bootstrap";
import {addListOfToDos} from "../../http/ListsAPI";
import {Context} from "../../index";

const AddList = observer(({show, onHide}) => {
    const {user} = useContext(Context)
    const [title, setTitle] = useState('')
    const submit = (e) => {
        e.preventDefault()
        const foundItem = user.lists.find(item => item.name === title);
        if (!foundItem) {
            addListOfToDos(user.user.email, title).then(data =>{
                user.setLists([...user.lists, data])
                user.setSelectedList(user.lists[0])
                }
            )
        } else {
            alert("List with this name already exist!")
        }
        onHide()
    }
    return (
        <Modal
            show={show}
            onHide={onHide}
            centered
            onSubmit={submit}
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Add new list
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Control
                        onChange={e => setTitle(e.target.value)}
                        className="mt-3"
                        placeholder="Enter list name"
                        type="text"
                    />
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={onHide}>Close</Button>
                <Button variant="outline-success" onClick={submit}>Add</Button>
            </Modal.Footer>
        </Modal>
    );
});


export default AddList;