import React, {useContext, useEffect, useState} from 'react';
import {FaPlusCircle} from 'react-icons/fa';
import {Context} from "../index";

const InputTodo = (props) => {
    const [inputText, setInputText] = useState({
        title: '',
    });
    const [isDisabled, setIsDisabled] = useState(true);
    const {user} = useContext(Context)
    useEffect(() => {
        if (user.lists.length === 0) {
            setIsDisabled(true)
        } else {
            setIsDisabled(false)
        }
    }, [user.lists])
    const onChange = (e) => {
        setInputText({
            ...inputText,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (inputText.title.trim()) {
            props.addTodoProps(inputText.title, new Date().toLocaleString().split(',')[0], "LOW");
            setInputText({
                title: '',
            });
        }
    };

    return (
        <form onSubmit={handleSubmit} className="form-container">
            <input
                type="text"
                className="input-text"
                placeholder="Add todo..."
                value={inputText.title}
                name="title"
                onChange={onChange}
                disabled={isDisabled}
            />
            <button type="button" className="input-submit" onClick={handleSubmit} disabled={isDisabled}>
                <FaPlusCircle
                    style={{color: 'darkcyan', fontSize: '20px', marginTop: '2px'}}
                />
            </button>
        </form>
    );
};

export default InputTodo;
