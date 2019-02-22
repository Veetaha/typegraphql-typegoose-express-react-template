import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import * as I from '@common/interfaces';
import ApolloClient from "apollo-boost";
import { QueryUser } from '@graphql/generated';

export enum UserStateType {
    Request = 'USER_AUTHENTIFICATE_REQUEST',
    Error   = 'USER_AUTHENTIFICATE_ERROR'  ,
    Success = 'USER_AUTHENTIFICATE_SUCCESS'
} 


const client = new ApolloClient();
  
export interface UserState {
    isFetching: boolean;
    token: string;
    currentUser?: I.Maybe<QueryUser.GetUser>;
}

export const defaultPayload: UserState = {
    isFetching: false,
    token: "",
    currentUser: null
};

export interface UserActions {
    type: UserStateType;
    payload: UserState;
}

type UserResult<TResult> = ThunkAction<TResult, UserState, undefined, UserActions>;

export type FetchPhotosThunkDispatch = ThunkDispatch<UserState, undefined, UserActions>;

export function authentificate(login: string, password: string ): UserResult<void> {
    return async dispatch => {
        dispatch({ 
            type: UserStateType.Request,
            payload: { ...defaultPayload, isFetching: true }
        });
        let result;
        try {
            const response = await client.query<QueryUser.Query, QueryUser.Variables>({
                variables: {
                    id: login + password
                }, 
                query: QueryUser.Document
            });
            if (!response || response.errors) {
                throw new Error(response.networkStatus.toString());
            }
            result = response.data.getUser;
        } catch(e) {
            dispatch({ type: UserStateType.Error, payload: { 
                ...defaultPayload,
            }});
            // call function from middlware  --> snackbar
            return;
        }
        dispatch({
            type: UserStateType.Request,
            payload: {
                ...defaultPayload,
                currentUser: result
            }
        });
    };
}