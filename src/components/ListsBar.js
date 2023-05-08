import React, {useContext, useState} from 'react';
import {observer} from "mobx-react-lite";
import {Card, ListGroup} from "react-bootstrap";
import {Context} from "../index";
import {FaPlusCircle} from "react-icons/fa";
import AddList from "./Modal/AddList";

const ListsBar = observer(() => {
    const {user} = useContext(Context)
    const [listsVisible, setListsVisible] = useState(false)
    return (<Card style={{
        width: 230, boxShadow: "6px 5px 18px 15px rgba(34, 60, 80, 0.2)", left: 0, marginLeft: 10
    }}>
        <h3 style={{textAlign: "center", marginTop: 10, display: "flex", marginLeft: 12, marginBottom: 0}}>Lists of Todo
            <button type="button" className="input-submit" onClick={() => setListsVisible(true)}>
                <FaPlusCircle style={{
                    color: 'darkcyan',
                    fontSize: '20px',
                    marginTop: '2px',
                    marginLeft: '20px',
                    display: "flex"
                }}/>
            </button>
        </h3>
        <AddList show={listsVisible} onHide={() => setListsVisible(false)}/>
        <ListGroup
            id="listGroup"
            color="primary"
            label="Lists of Todo" style={{height: 500}} activeKey="0">
            {user.lists.map(type => <ListGroup.Item id={type.id} style={{
                height: 50, paddingBottom: 5, paddingTop: 5, cursor: "pointer"
            }}
                                                    active={type.id === user.selectedList.id}
                                                    onClick={() => user.setSelectedList(type)}
                                                    value={type.name}
                                                    key={type.name}>{type.name}</ListGroup.Item>)}

        </ListGroup>
    </Card>);
});

export default ListsBar;