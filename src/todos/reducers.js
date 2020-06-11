import {CREATE_TODO, 
    REMOVE_TODO, 
    MARK_TODO_AS_COMPLETED,
LOAD_TODOS_IN_PROGRESS,
LOAD_TODOS_SUCCESS,
LOAD_TODOS_FAILURE} from './actions';


//Creating a default state for todos
const initialState = { isLoading: false, data: []};

export const todos = (state = initialState, action) => {

    const{type, payload} = action;

    switch (type) {

        case CREATE_TODO: {

            const {todo} = payload;

            //Use the spread operator to get the rest of the state untouched, and concat the new todo item
            return {...state,  data: state.data.concat(todo)

            };

        };

        case REMOVE_TODO: {

            const {todo: todoToRemove} = payload;

            //Using filter, we only want todos who's id property does not equal the todo id we got in the payload.
            return {...state, data: state.data.filter(todo => todo.id !== todoToRemove.id)
            }
        }

        case MARK_TODO_AS_COMPLETED: {

            const {todo: updatedTodo} = payload;

            //If a todos id is equal to the updatedtodos id,
            //replace it with the updated todo
            return {
                    ...state, 
                    data: state.data.map(todo => {
                    if(todo.id === updatedTodo.id){
                        return updatedTodo;
                    }
                    return todo;
                }),
            }
        }

        case LOAD_TODOS_SUCCESS: {

            const {todos} = payload;
            return {...state,
                isloading: false,
                data: todos
            }
        }
        
        case LOAD_TODOS_IN_PROGRESS:
            return{
                ...state,
                isLoading: true,
            }

        case LOAD_TODOS_FAILURE: 
            return{
                ...state,
                isLoading: false,
            }


        //Add default case to return the state as it is. The reson is because the todos reducer will be called
        //whenever 'any' action gets triggered in the application. If our switch block makes it to here - it means the action
        //isn't on that we were concerned with - so we should simply return the state as it is.
        default:
            return state;
    }
}