import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromRoot from './../app.reducer';
import * as AUTH from './auth.actions';

@Injectable()
export class AuthService {
  redirectUrl: string ;

  constructor(private store: Store<fromRoot.State>) { }

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
}
