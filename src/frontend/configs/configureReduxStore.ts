import { createStore, applyMiddleware, compose, Action as ActionCommon } from 'redux';
import { PhotosState } from '@actions/fetchPhotos';
import rootReducer from '@reducers/index';
import thunk from 'redux-thunk';

const enhancer = compose(
    
    applyMiddleware(thunk),
);
export interface Action<T = unknown> extends ActionCommon  {
    payload: T;
}

export interface ApplicationStore {
    photos: PhotosState;
}

export default createStore(rootReducer, enhancer);