import { User } from "../user/User";


export interface State {
    user: User;
}

const initialState: State = {
    user: null
}

export function authReducer(state = initialState, action) {
    return state;
}