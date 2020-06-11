//Create a constant for the action's type
export const CREATE_TODO = 'CREATE_TODO';


//Create the actions that our compenents can dispatch

//Export a function (called an action creator) that takes info as an arguement and returns an action object with it's
//info as the payload
export const createTodo = todo => ({

    type: CREATE_TODO,
    payload: {todo},

});


export const REMOVE_TODO = 'REMOVE_TODO';

//Use the text of  a todo item as a uniqe identifier to delete it.

export const removeTodo = todo => ({

    type: REMOVE_TODO,
    payload: {todo},

});

// "Action type"
export const MARK_TODO_AS_COMPLETED = "MARK_TODO_AS_COMPLETED";

// "Action creator"
export const markTodoAsCompleted = todo => ({

    type: MARK_TODO_AS_COMPLETED,
    payload: {todo},

});

export const LOAD_TODOS_IN_PROGRESS = 'LOAD_TODOS_IN_PROGRESS';

export const loadTodosInProgress = () => ({
    type: LOAD_TODOS_IN_PROGRESS,
})

export const LOAD_TODOS_SUCCESS = 'LOAD_TODOS_SUCCESS';

export const loadTodosSuccess = todos => ({
    type: LOAD_TODOS_SUCCESS,
    payload: {todos},
})

export const LOAD_TODOS_FAILURE = 'LOAD_TODOS_FAILURE';

export const loadTodosFailure = () => ({
    type: LOAD_TODOS_FAILURE
})