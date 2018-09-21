import * as fromAuth from './auth/auth.reducer';
import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';

export interface State {
    auth: fromAuth.State;
}

export const reducers: ActionReducerMap<State> = {
    auth: fromAuth.authReducer
}

export const getAuthState = createFeatureSelector<fromAuth.State>('auth')
export const getIsAuth = createSelector(getAuthState , fromAuth.getIsAuth);
export const getToken = createSelector(getAuthState , fromAuth.getToken);