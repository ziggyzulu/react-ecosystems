import 'node-fetch';
import fetchMock from 'fetch-mock';
import {expect} from 'chai';
import {loadTodos} from '../thunks';
import sinon from 'sinon';

describe('The load todos thunk', () => {

    //Async seeing as we're testing an asynchronous thunks
    it('Dispatches the correct actions in the success scenario', async ()=> {

        //Fake function using sinon, that keeps track of which arguements it was called with.
        const fakeDispatch = sinon.spy();

        //Define what we want our fake fetch to return when our thunk calls it
        const fakeTodos = [{text: '1'}, {text: '2'}];
        //when our thunk tries to send a fetch request to this url, it'll just get back the fake todos we defined
        //instead of getting back an actual request.
        fetchMock.get('http://localhost:8080/todos', fakeTodos);
        

        //Define exactly what we want the actions that our fake dispatch gets called with to look like
        const expectedFirstAction = { type: 'LOAD_TODOS_IN_PROGRESS'};
        const expectedSecondAction = { type: 'LOAD_TODOS_SUCCESS', payload: {

            todos: fakeTodos,

            }
        };
        
        //Call our thunk
        await loadTodos()(fakeDispatch);

        //Test that our loadtodos dispatched the actions that we expected it to in the correct order.
        // getCall(0) refers to the first call thst was made to our fake dispatch
        // args[0] refers to the first arguement that was passed to the first call to fakeDispatch
        expect(fakeDispatch.getCall(0).args[0]).to.deep.equal(expectedFirstAction);

        //And test again for the second action
        expect(fakeDispatch.getCall(1).args[0]).to.deep.equal(expectedSecondAction);

        //Restore our fetch to its original state
        fetchMock.reset();

        



    })

})