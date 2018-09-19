import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromRoot from './../app.reducer';
import * as AUTH from './auth.actions';
import { take } from 'rxjs/operators';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthData } from './auth-data.model';

interface LoginData {
  token: string;
}

@Injectable()
export class AuthService {
  redirectUrl: string ;

  constructor(
    private store: Store<fromRoot.State>,
    private router: Router,
    private http: HttpClient
    ) { }

  setRedirectUrl(url: string): void {
    this.redirectUrl = url;
  }

  getLoginUrl(): string {
    return 'login';
  }

  login(authData: AuthData) {
    let token: string;
    this.http.post(
      'http://localhost:3000/api/users/login',
      authData
      ).subscribe( (data: LoginData) => {
        token = data.token.replace('Bearer ', '');
        this.store.dispatch(new AUTH.SetAuthenticated(token));
      });
    //  // Just set the global auth state to logged in for the moment
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

  // Get the token
  getAsyncToken() {
    return 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNWJhMDEyMzlhNzc5ZDQ0N2Q2NDE2YzMwIiwiaWF0IjoxNTM3MzQ2NTc5LCJleHAiOjE1MzczNTY1Nzl9.sXttOD8mo3wTKprvOvafnJUvVbAmiX1d8hpj19jcii8';
  }
}
