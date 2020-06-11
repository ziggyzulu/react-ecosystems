import React from 'react';

import styled from 'styled-components';

const TodoItemContainer = styled.div`
    background: #fff;
    border-radius: 8px;
    margin-top: 8px;
    padding: 16px;
    position: relative;
    box-shadow: 0 4px 8px grey;
`;

//Extending styled components. This new styled component we're defining will start off
// with all the styles from TodoItem container, just like extending a class in OOC
const TodoItemContainerWithWarning = styled(TodoItemContainer)`

    border-bottom: ${props => (new Date(props.createdAt) > new Date(Date.now() - 8640000 * 5)
    ? 'none' : '2px solid red')};

`;

const ButtonsContainer = styled.div`

    position: absolute;
    right: 12px;
    bottom: 12px;

`;

const Button = styled.button`

    font-size: 16px;
    padding: 8px;
    border: none;
    border-radius: 8px;
    outline: none;
    cursor: pointer;

    display: inline-block;
    background-color: #22ee22;

`;

//Extending the button container styled component 
const CompletedButton = styled(Button)`
    
    background-color: #22ee22;

`;

const RemoveButton = styled(Button)`

    background-color: #ee2222;
    margin-left: 8px;

`;


const TodoListItem = ({todo, onRemovePressed, onCompletedPressed}) => {

    //For deciding which CSS to use with style components. If todo.iscompleted is true, use the regular stlye,
    //otherwise use the style with warning.
    const Container = todo.isCompleted ? TodoItemContainer : TodoItemContainerWithWarning;

    return (

        <Container createdAt={todo.createdAt}>
            <h3>{todo.text}</h3>
            <p>
                Created at:&nbsp; {
                    (new Date(todo.createdAt)).toLocaleDateString()
            } 
            </p>
            <ButtonsContainer>
                {todo.isCompleted ? null :
                <CompletedButton className="completed-button" onClick={()=> onCompletedPressed(todo.id)}>Mark as completed</CompletedButton>}
                <RemoveButton
                    //onRemovePressed is a function which was passed in as a property from todolist.js
                    //on click,we call this with the text of the todo. 
                    onClick={() => onRemovePressed(todo.id)}
                    className="remove-button">Remove</RemoveButton>
            </ButtonsContainer>
        </Container> 
    

    );
}

export default TodoListItem;