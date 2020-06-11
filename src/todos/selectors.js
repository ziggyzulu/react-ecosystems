import { createSelector} from 'reselect';

//Takes state as an arguement, and returns the location in our state where todos are stored.
export const getTodos = state => state.todos.data;

//Exporting functions means we can use them elsewhere
export const getTodosLoading = state => state.todos.isLoading;

//Reselect helps create selectors that makes use of other selectors.
//Create selector takes a varied number of arguements, each of which is some sort of selector.
// The last arguement we pass to it is a function who's return value is the return value of the entire selector,
// and the result of all the selectors passed before it.
//Also, createSeelector's return value only changes when the return values of the selectors we pass as arguements changes.
export const getIncompleteTodos = createSelector(

    getTodos,
    //A fucntion that takes todos as an arguement and gets only the todos that are not completed from the array
    (todos) => todos.filter(todo => !todo.isCompleted)
)

export const getCompletedTodos = createSelector(
    getTodos,
    (todos) => todos.filter(todo => todo.isCompleted)
);

