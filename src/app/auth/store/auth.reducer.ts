import { User } from "../user/User";
import * as AuthAction from "./auth.actions";


export interface State {
    user: User;
}

const initialState: State = {
    user: null
}

export function authReducer(
    state = initialState, 
    action: AuthAction.AuthAction)
    {
    switch(action.type) {
        case AuthAction.LOGIN:
            return {
                ...state,
                user: action.payload
            };
        case AuthAction.LOGOUT:
            return {
                ...state,
                user: null
            };
        default:
            return state;
    }
}