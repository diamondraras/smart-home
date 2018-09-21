import { Action } from '@ngrx/store';

export const SET_AUTHENTICATED = '[Auth] SET_AUTHENTICATED';
export const SET_UNAUTHENTICATED = '[Auth] SET_UNAUTHENTICATED';
export const LOGIN = '[Auth] LOGIN';
export const LOGOUT = '[Auth] LOGOUT';
export const LOGIN_SUCCESS = '[Auth] LOGIN_SUCCESS';
export const LOGIN_FAILURE = '[Auth] LOGIN_SUCCESS';

export class SetAuthenticated implements Action {
    readonly type = SET_AUTHENTICATED;
    constructor(public payload: string) {}
}

export class SetUnauthenticated implements Action {
    readonly type = SET_UNAUTHENTICATED;
}

export class Login implements Action {
    readonly type = LOGIN;
    constructor(public payload: any) {}
}

export class Logout implements Action {
    readonly type = LOGOUT;
}

export class LoginSuccess implements Action {
    readonly type = LOGIN_SUCCESS;
    constructor(public payload: any) {}
}

export class LoginFailure implements Action {
    readonly type = LOGIN_FAILURE;
    constructor(public payload: any) {}
}

export type AuthActions = SetAuthenticated | SetUnauthenticated | Login | Logout | LoginSuccess | LoginFailure;
