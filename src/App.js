import './App.css';
import {BrowserRouter as Router} from "react-router-dom";
import React, {useContext, useEffect, useState} from "react";
import TodoContainer from "./components/TodoContainer";
import {Context} from "./index";
import {Spinner} from "react-bootstrap";
import {check} from "./http/UserAPI";

function App() {
    const {user} = useContext(Context);
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        check().then((data) => {
            if (data !== "LOGOUT") {
                let user1 = {email: data.sub};
                user.setUser(user1);
                user.setIsAuth(true)
            } else {
                user.setUser('');

            }
        }).finally(() => {
            setLoading(false)
        })
    }, [])

    if (loading) {
        <Spinner animation={"grow"}/>
    }

    return (
        <Router basename={process.env.PUBLIC_URL}>
            <TodoContainer/>
        </Router>
    );
}

export default App;
