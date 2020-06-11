import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import NewTodoForm from './NewTodoForm';
import TodoListItem from './TodoListItem';
import {loadTodos, removeTodoRequest, markTodoAsCompletedRequest} from './thunks';
import {markTodoAsCompleted} from './actions';
import { displayAlert } from './thunks';
import {getTodos, getTodosLoading, getCompletedTodos, getIncompleteTodos} from './selectors';
import styled from 'styled-components';

//Create a styled component
const ListWrapper = styled.div`

    max-width: 700px;
    margin: auto;

`;


const TodoList = ({completedTodos, incompleteTodos, onRemovePressed, onCompletedPressed, isLoading, startLoadingTodos}) => {

    //Kick off loading todos
    useEffect(() => {
        startLoadingTodos();
    }, []);

    const loadingMessage = <div>Loading todos...</div>;
    const content = (
        <ListWrapper>
            <NewTodoForm/>
            <h3>Incomplete</h3>
            {/* Pass the onRemovePressed function to each item as a property */}
            {incompleteTodos.map(todo => <TodoListItem todo={todo} onCompletedPressed={onCompletedPressed} onRemovePressed={onRemovePressed}/> )}
        
            <h3>Completed:</h3>
            {completedTodos.map(todo => <TodoListItem todo={todo} onCompletedPressed={onCompletedPressed} onRemovePressed={onRemovePressed}/> )}

        </ListWrapper>
    );
    //Ternary operator to show the loading message if the componetis loading, otherwise show the content.
    return isLoading ?  loadingMessage : content;
};

//Get the todos from the state by calling selectors
const mapStateToProps = state => ({

    isLoading: getTodosLoading(state),
    
    completedTodos: getCompletedTodos(state),
    incompleteTodos: getIncompleteTodos(state)
    
    
})

//A function that takes the text of the todo item we want to remove as an arguement,
// and dispatches that removetodo action with the text.
const mapDispatchToProps = dispatch => ({

    startLoadingTodos: () => dispatch(loadTodos),
    onRemovePressed: id => dispatch(removeTodoRequest(id)),
    onCompletedPressed: id => dispatch(markTodoAsCompletedRequest(id)),
})

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);

