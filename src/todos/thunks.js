import { loadTodosInProgress, loadTodosSuccess, removeTodo, loadTodosFailure, createTodo, markTodoAsCompleted} from "./actions";



//export const loadTodos = () => async (dispatch, getState) => {
export const loadTodos = () => async dispatch => {
    
    //Try catch block to handle issues where our fethcing doesn't work
    try{
        //We can call other redux actions using the dispatch function
        dispatch(loadTodosInProgress());

        //Call the todos endpoint of the api
        const response = await fetch('http://localhost:8080/todos');

        const todos = await response.json();

        //Once we've retrieved the todos,  dispatch the load success action
        // with the todos we just loaded from the server
        dispatch(loadTodosSuccess(todos));

        //Error passed into catch
    } catch (e){
        dispatch(loadTodosFailure());
        //Call displayAlert passing in the error we just got
        dispatch(displayAlert(e));
    }
}

//Take the text of our new todo, and return an async function that takes dispatch as an arguement,
// whuch we can use to trigger other actions from inside this thunk
export const addTodoRequest = text => async dispatch => {

    try{
        //Request body to send to the server
        const body = JSON.stringify({text});

        const response = await fetch('http://localhost:8080/todos', { 
            headers: {
                'Content-type': 'application/json',
            },
            method: 'post',
            body,
        });

        const todo = await response.json();

        //Dispatch createTodo with the todo we got in the response
        dispatch(createTodo(todo));

    } catch (e){

        //If an error happens, dispatch displayAlert passing in the error
        dispatch(displayAlert(e));

    }
}

export const removeTodoRequest = id => async dispatch => {
    
    try {
        const response = await fetch(`http://localhost:8080/todos/${id}`, {
            method: 'delete'
        });
        const removedTodo = await response.json();
        dispatch(removeTodo(removedTodo));
    } catch (e) {
        dispatch(displayAlert(e));
    }
}

export const markTodoAsCompletedRequest = id => async dispatch => {

    try {
        const response = await fetch(`http://localhost:8080/todos/${id}/completed`, {
            method: 'post'
        });
        const updatedTodo = await response.json();
        dispatch(markTodoAsCompleted(updatedTodo));
    } catch (e) {
        dispatch(displayAlert(e));
    }

}

export const displayAlert = text => () => {
    alert(text);
};