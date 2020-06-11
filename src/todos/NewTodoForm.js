import React, { useState } from 'react';
import { connect } from 'react-redux';
//import { createTodo } from './actions';
import {getTodos} from './selectors';
import {addTodoRequest} from './thunks';

import styled from 'styled-components';

const FormContainer = styled.div`

    border-radius: 8px;
    padding: 16px;
    text-align: center;
    box-shadow: 0 4px 8px grey;

`;

const NewTodoInput = styled.input`

    font-size: 16px;
    padding: 8px;
    border: none;
    border-bottom: 2px solid #ddd;
    border-radius: 8px;
    width: 70%;
    outline: none;
`;

const NewTodoButton = styled.button`

    font-size: 16px;
    padding: 8px;
    border: none;
    border-radius: 8px;
    outline: none;
    cursor: pointer;
    margin-left: 8px;
    width: 20%;
    background-color: #22ee22;

`;

const NewTodoForm = ({todos, onCreatePressed}) => {

    //Keeping track of the text input value with state
    const [inputValue, setInputValue] = useState('');

    return (
        <FormContainer className="new-todo-form">
            <NewTodoInput
                type="text"
                placeholder="Type your new todo here"
                value={inputValue}
                onChange={e => setInputValue(e.target.value)} />
            <NewTodoButton
                onClick={() => {

                    //To prevent a user entring duplicate todo test, use array.some to check
                    //if there's already a todo that contains this text equal to the input value
                    const isDuplicateText =
                        todos.some(todo => todo.text === inputValue);
                    if (!isDuplicateText) {

                        //Call onCreatepressed with the current input value, and then clear it.
                        onCreatePressed(inputValue);
                        setInputValue('');

                    }
                    
                }} 
                >
                Create Todo
            </NewTodoButton>


        </FormContainer>

    );
};

const mapStateToProps = state => ({
    todos: getTodos(state),
});

const mapDispatchToProps = dispatch => ({
    onCreatePressed: text => dispatch(addTodoRequest(text)),
});


export default connect(mapStateToProps, mapDispatchToProps)(NewTodoForm);