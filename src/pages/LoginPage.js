import React, {useContext, useState} from 'react';
import {Button, Card, Container, Form} from "react-bootstrap";
import {useHistory} from "react-router-dom";
import "./css/LoginPage.css"
import {login} from "../http/UserAPI";
import {Context} from "../index";
import {observer} from "mobx-react-lite";
import 'bootstrap/dist/css/bootstrap.css';


const LoginPage = observer(() => {
    const {user} = useContext(Context)
    const history = useHistory()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const click = async (e) => {
        try {
            let data = await login(email, password);
            let user1 = {email: data.sub}
            user.setUser(user1)
            user.setIsAuth(true)
            history.push("/")
        } catch (e) {
            alert(e)
        }

    }

    return (<Container id="flex-container">
        <Card id="form" className="align-items-center">
            <h2 className="m-auto">Login</h2>
            <Form className="d-flex flex-column">
                <Form.Group>
                    <h5 className="mt-5">E-mail</h5>
                    <Form.Control id="log_email" className="mb-4" placeholder="Enter your e-mail...."
                                  type="email" onChange={e => setEmail(e.target.value)}></Form.Control>
                    <div id="log_err_msg" style={{color: "red"}}></div>
                </Form.Group>
                <Form.Group style={{paddingBottom: 20}}>
                    <h5 className="mt-4">Password</h5>
                    <Form.Control id="log_pass" className="mb-4" placeholder="Enter password ...."
                                  type="password" onChange={e => setPassword(e.target.value)}></Form.Control>
                </Form.Group>
                <Button className="w-20 align-self-center" variant="secondary" color="gray"
                        style={{marginLeft: 10, marginRight: 10, width: 100, height: 40}} onClick={() => {
                    click()
                }}>Login</Button>
                <a onClick={() => {
                    history.push("/register")
                }} className="align-self-center mt-3 mb-3"
                   style={{fontSize: 17, color: "black", textDecoration: "none", cursor: "pointer"}}>I don`t have an account</a>
            </Form>
        </Card>
    </Container>);
});

export default LoginPage;