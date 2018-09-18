import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromRoot from './../app.reducer';
import * as AUTH from './auth.actions';
import { take } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {
  redirectUrl: string ;

  constructor(
    private store: Store<fromRoot.State>,
    private router: Router
    ) { }

  setRedirectUrl(url: string): void {
    this.redirectUrl = url;
  }

  getLoginUrl(): string {
    return 'login';
  }

  login() { // Params not needed for now
    this.store.dispatch(new AUTH.SetAuthenticated()); // Just set the global auth state to logged in for the moment
  }

  logout() {
    this.store.dispatch(new AUTH.SetUnauthenticated());
  }

  // Subscribe to auth state to implements redirection based on
  initAuthListener() {
    this.store.select(fromRoot.getIsAuth)
    .subscribe((state) => {
      if (state) {
        this.router.navigate(['dashboard']);
      } else {
        this.router.navigate(['login']);
      }
    });
  }
}
