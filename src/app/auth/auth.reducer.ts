import { AuthActions, SET_AUTHENTICATED, SET_UNAUTHENTICATED } from './auth.actions';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export interface State {
    isAuthenticated: boolean;
    token: string;
}

const initialState: State = {
    isAuthenticated: false,
    token: 'no-token'
};

export function authReducer(state = initialState, action: AuthActions) {
    switch (action.type) {
        case SET_AUTHENTICATED:
            return {
                token: action.payload,
                isAuthenticated: true
            };
        case SET_UNAUTHENTICATED:
            return {
                token: 'no-token',
                isAuthenticated: false
            };
        default:
            return {...state};
    }
}

export const getIsAuth = (state: State) => state.isAuthenticated;
export const getToken = (state: State) => state.token;
