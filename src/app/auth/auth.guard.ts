import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { CanLoad, CanActivate, Route, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { take } from 'rxjs/operators';

import * as fromRoot from './../app.reducer';
import { resolve } from 'url';

@Injectable()
export class AuthGuard implements CanLoad, CanActivate {
    state = false;
    constructor(
        private authService: AuthService,
        private router: Router,
        private store: Store<fromRoot.State>,
        ) {}

    canLoad(route: Route) {
        if (!this.authService.isAuthenticated()) {
            this.router.navigate(['login']);
            return false;
        }
        return true;
    }

    canActivate() {
        if (!this.authService.isAuthenticated()) {
            this.router.navigate(['login']);
            return false;
        }
        return true;
    }
}
