import { combineReducers, Reducer } from 'redux';
import userReducer from '@reducers/user';
import { Action } from '@configs/configureReduxStore';

import { ApplicationStore } from '@configs/configureReduxStore';

type ObjForCombineReducers = { 
    [TKey in keyof ApplicationStore]: Reducer<ApplicationStore[TKey], Action<any>>;
};

const applicationState: ObjForCombineReducers = {
    user: userReducer
};

export default combineReducers(applicationState);