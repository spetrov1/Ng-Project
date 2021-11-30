import { User } from "../user/User";
import * as AuthAction from "./auth.actions";


export interface State {
    user: User;
    authError: string;
    loading: boolean;
}

const initialState: State = {
    user: null,
    authError: null,
    loading: false
}

export function authReducer(
    state = initialState, 
    action: AuthAction.AuthAction)
    {
    switch(action.type) {
        case AuthAction.LOGIN_SUCCESS:
            return {
                ...state,
                authError: null,
                user: action.payload
            };
        case AuthAction.LOGOUT:
            return {
                ...state,
                authError: null,
                user: null
            };
        case AuthAction.LOGIN_START:
            return {
                ...state,
                authError: null
                // why not adding line 'user: null'
            }
        case AuthAction.LOGIN_FAIL:
            return {
                ...state,
                authError: action.payload,
                user: null
            }
        default:
            return state;
    }
}