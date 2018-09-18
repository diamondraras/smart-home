import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { CanLoad, CanActivate, Route, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { take } from 'rxjs/operators';

import * as fromRoot from './../app.reducer';

@Injectable()
export class AuthGuard implements CanLoad, CanActivate {
    constructor(private authService: AuthService, private router: Router, private store: Store<fromRoot.State>) {}

    canLoad(route: Route) {
        return this.store.select(fromRoot.getIsAuth)
                    .pipe(take(1));
    }

    canActivate() {
        return this.store.select(fromRoot.getIsAuth)
                    .pipe(take(1));
    }
}
