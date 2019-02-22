import { createStore, applyMiddleware, compose, Action as ActionCommon } from 'redux';
import { UserState } from '@actions/user';
import rootReducer from '@reducers/index';
import thunk from 'redux-thunk';

// DELETE ON PROD
const composeEnhancers = (
        window as any
    ).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


const enhancer = composeEnhancers(
    applyMiddleware(thunk),
);


export interface Action<T = unknown> extends ActionCommon  {
    payload: T;
}

export interface ApplicationStore {
    user: UserState;
}

export default createStore(rootReducer, enhancer);