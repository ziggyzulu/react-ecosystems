import {createStore, combineReducers, applyMiddleware} from 'redux';
import {todos} from './todos/reducers';
import {persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';

//Object to put all the reducers we define in reducers.js
const reducers = {todos};

const persistConfig = {
    key: 'root',
    //Storage defaults to localstorage on the web
    storage,
    stateReconciler: autoMergeLevel2,

}

//Create a root reducer with the combineReducers function we imported, passing in the reducers obecjt. This puts our reducers
//into a form that we can pass to the createStore function that we imported.
const rootReducer = combineReducers (reducers);

//Wrap our root reducer in the presistReducer.
const persistedReducer = persistReducer(persistConfig, rootReducer);

//This function returns createStore, called with the persistedReducer we just created.
export const configureStore = () =>
    createStore(
        persistedReducer,
        composeWithDevTools(
            applyMiddleware(thunk)
        )
    );