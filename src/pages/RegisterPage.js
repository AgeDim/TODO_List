import React, {useContext, useState} from 'react';
import {Button, Card, Col, Container, Form, Row} from "react-bootstrap";
import {useHistory} from "react-router-dom";
import {register} from "../http/UserAPI";
import validator from "validator/es";
import "./css/RegisterPage.css"
import {Context} from "../index";
import {observer} from "mobx-react-lite";
import 'bootstrap/dist/css/bootstrap.css';


const RegisterPage = observer(() => {
    const {user} = useContext(Context)
    const history = useHistory()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const click = async () => {
        let checkBox = document.getElementById('reg_check')
        if (!validator.isEmail(document.getElementById("reg_email").value)) {
            document.getElementById("reg_err_msg").textContent = 'Uncorrect email!'
        } else if (document.getElementById("reg_pass").value === '') {
            document.getElementById("reg_err_msg").textContent = "Password can't be empty"
        } else if (document.getElementById("reg_pass").value !== document.getElementById("reg_pass1").value) {
            document.getElementById("reg_err_msg").textContent = "Repeated password incorrectly"
        } else if (!validator.isStrongPassword(document.getElementById("reg_pass").value, {minSymbols: 0})) {
            document.getElementById("reg_err_msg").textContent = "Password must consist of one lowercase, uppercase letter and number, at least 8 characters"
        } else {
            try {
                let data = await register(email, password)
                let user1 = {email: data.sub}
                user.setUser(user1)
                user.setIsAuth(true)
                history.push("/")
            } catch (e) {
                alert(e.response)
                console.log(e)
            }
        }
    }
    return (<Container id="flex-container">
        <Card id="form" className="align-items-center">
            <h2 style={{marginTop:30, marginBottom:15}}>Sign up</h2>
            <Form className="d-flex flex-column">
                <h5 className="mt-0">E-mail</h5>
                <Form.Control className="mb-3" id="reg_email" placeholder="Enter your e-mail..."
                              type="email" onChange={e => setEmail(e.target.value)}></Form.Control>
                <h5>Create a password</h5>
                <Form.Control className="mb-3" id="reg_pass" placeholder="Enter password..."
                              type="password" onChange={e => setPassword(e.target.value)}></Form.Control>
                <h5>Repeat the password</h5>
                <Form.Control className="mb-3" id="reg_pass1" placeholder="Repeat the password..."
                              type="password"></Form.Control>
                <div style={{color: "red", fontSize: 20}} id="reg_err_msg"></div>
                <Button className="w-20 align-self-center" variant="secondary" color="gray" style={{marginRight: 10}}
                        onClick={() => {
                            click()
                        }}>Finish registration!</Button>
                <a href={"/login"} className="align-self-center mt-3 mb-3"
                   style={{fontSize: 18, color: "black", textDecoration: "none"}}>I have an account</a>
            </Form>
        </Card>
    </Container>);
});

export default RegisterPage;