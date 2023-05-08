import './css/App.css';
import {BrowserRouter, useHistory} from "react-router-dom";
import React, {useContext, useEffect, useState} from "react";
import {Context} from "./index";
import {Spinner} from "react-bootstrap";
import {check} from "./http/UserAPI";
import AppRouter from "./components/AppRouter";
import {LOGIN_ROUTE} from "./utils/consts";

function App() {
    const {user} = useContext(Context);
    const [loading, setLoading] = useState(true)
    const history = useHistory()

    const logout = () => {
        user.setUser({})
        user.setIsAuth(false)
    }

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
        <BrowserRouter>
            {!user.isAuth ? <button className="login_btn" onClick={()=>{history.push(LOGIN_ROUTE)}}>Login</button> :
                <button className="logout_btn" onClick={() => {
                    logout()
                }}>Logout</button>}
            <AppRouter/>
        </BrowserRouter>
    );
}

export default App;
