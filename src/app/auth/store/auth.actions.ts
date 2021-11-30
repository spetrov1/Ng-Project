import { Action } from "@ngrx/store";
import { User } from "../user/User";

export const LOGIN_START = '[Auth] Login Start'
export const LOGIN_FAIL = '[Auth] Login Fail'
export const LOGIN_SUCCESS = '[Auth] Login Success';
export const LOGOUT = '[Auth] Logout';

export class LoginSuccess implements Action {
    readonly type = LOGIN_SUCCESS;

    constructor(public payload: User) {}
}

export class LoginStart implements Action {
    readonly type = LOGIN_START;

    constructor(public payload: { email: string; password: string }) {}
}

export class LoginFail implements Action {
    readonly type = LOGIN_FAIL;

    constructor(public payload: string) {}
}

export class Logout implements Action {
    readonly type = LOGOUT;
}

export type AuthAction = LoginSuccess | LoginStart | LoginFail | Logout;