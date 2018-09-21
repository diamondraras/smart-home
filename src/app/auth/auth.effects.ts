import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

import * as fromAuth from './auth.actions';
import { map, switchMap, catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs';


@Injectable()
export class AuthEffects {
    constructor(
        private actions: Actions,
        private authService: AuthService,
        private router: Router
    ) {}

    @Effect()
    Login: Observable<any> = this.actions
    .ofType(fromAuth.LOGIN)
    .pipe(map((action: fromAuth.Login) => action.payload))
    .pipe(
        switchMap(payload => {
            return this.authService.login(payload.email, payload.password)
                .pipe(
                    map((user) => {
                        console.log(user);
                        return new fromAuth.LoginSuccess({token: user.token});
                    }),
                    catchError((err) => {
                        return of(new fromAuth.LoginFailure({ error: err}));
                        })
                    );
                })
            );
    @Effect({ dispatch: false })
    Logout: Observable<any> = this.actions
    .pipe(
        ofType(fromAuth.LOGOUT),
        tap(() => {
            localStorage.removeItem('token');
            this.router.navigate(['/login']);
        })
    )

    @Effect({ dispatch: false })
    LoginSuccess: Observable<any>  = this.actions.pipe(
    ofType(fromAuth.LOGIN_SUCCESS),
    tap((action) => {
        localStorage.setItem('token', action.payload.token);
        this.router.navigate(['/dashboard']);
    }));

    @Effect({ dispatch: false })
    LoginFailure: Observable<any>  = this.actions.pipe(
    ofType(fromAuth.LOGIN_FAILURE));
}