import { Action } from "@ngrx/store";
import { User } from "../user/User";

export const LOGIN = '[Auth] LOGIN';
export const LOGOUT = '[Auth] LOGOUT';

export class Login implements Action {
    readonly type = LOGIN;

    constructor(public payload: User) {}
}

export class Logout implements Action {
    readonly type = LOGOUT;
}

export type AuthAction = Login | Logout;