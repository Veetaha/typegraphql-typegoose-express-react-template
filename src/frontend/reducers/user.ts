import { 
    UserStateType,
    UserActions,
    defaultPayload
} from '@actions/user';

const initialState = {
    ...defaultPayload
};

export default function userReducer(state = initialState, action: UserActions) {
    const data = action.payload;
    switch (action.type) {
        case UserStateType.Request: {
            return {
                ...state, 
                isFetching: data.isFetching
            };
        }
        case UserStateType.Success: {
            return {
                ...state, 
                isFetching:       data.isFetching,
                token:            data.token,
                currentUser:      data.currentUser
            };
        }
        default: {
            return state;
        }
    }
}