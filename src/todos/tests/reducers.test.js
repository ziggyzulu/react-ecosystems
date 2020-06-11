import { expect} from 'chai';
import { todos} from '../reducers';

describe('The todos reducer', () => {

    //Tests that our reducer responds appropriately to the create todo action
    it('Ads a new todo when CREATE_TODO action is recieved', () => {

        //We need a fake current state and fake action to pass as arguements to our reducer

        const fakeTodo = { text: 'hello', isCompleted: false};
        const fakeAction = {
            type: 'CREATE_TODO',
            payload: {
                todo: fakeTodo
            },
        };

        const originalState = { isLoading: false, data: []}

        //Define a constant that has the results weexpect our todos reducer to return when we pass it these arguements

        const expected = { 

            isLoading: false,
            //Data will be an array with our fake todo in it
            data: [fakeTodo]

        }

        //Get the actual value that our todo reducer return in this situation
        const actual = todos(originalState, fakeAction);

        //Use Chai to compare our actual and expected results
        expect(actual).to.deep.equal(expected);

    });


})