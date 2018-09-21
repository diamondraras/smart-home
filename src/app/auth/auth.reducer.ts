import { AuthActions, SET_AUTHENTICATED, SET_UNAUTHENTICATED, LOGIN_SUCCESS, LOGIN_FAILURE } from './auth.actions';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export interface State {
    isAuthenticated: boolean;
    token: string | null;
    errorMessage: string | null;
}

const initialState: State = {
    isAuthenticated: false,
    token: null,
    errorMessage: null
};

export function authReducer(state = initialState, action: AuthActions) {
    switch (action.type) {
        case LOGIN_SUCCESS:
            return {
                ...state,
                isAuthenticated: true,
                token: action.payload.token,
                errorMessage: null
            };
        case LOGIN_FAILURE:
            return {
                ...state,
                isAuthenticated: false,
                token: null,
                errorMessage: 'Incorrect email and/or password.'
            };
        case SET_AUTHENTICATED:
            return {
                ...state,
                token: action.payload,
                isAuthenticated: true
            };
        case SET_UNAUTHENTICATED:
            return {
                ...state,
                token: 'no-token',
                isAuthenticated: false
            };
        default:
            return {...state};
    }
}

export const getIsAuth = (state: State) => state.isAuthenticated;
export const getToken = (state: State) => state.token;
