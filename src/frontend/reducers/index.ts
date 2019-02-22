import { combineReducers, Reducer } from 'redux';
import photosReducer from '@reducers/fetchPhotos';
import { Action } from '@configs/configureReduxStore';

import { ApplicationStore } from '@configs/configureReduxStore';

type ObjForCombineReducers = { 
    [TKey in keyof ApplicationStore]: Reducer<ApplicationStore[TKey], Action<any>>;
};

const applicationState: ObjForCombineReducers = {
    photos: photosReducer
};

export default combineReducers(applicationState);