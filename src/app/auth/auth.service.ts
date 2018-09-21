import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromRoot from './../app.reducer';
import * as AUTH from './auth.actions';
import { take } from 'rxjs/operators';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthData } from './auth-data.model';
import { JwtHelperService } from '@auth0/angular-jwt';

/* TODO: Implement token expiration verification
*/
interface LoginData {
  token: string;
}

@Injectable()
export class AuthService {
  redirectUrl: string ;

  constructor(
    private store: Store<fromRoot.State>,
    private router: Router,
    private http: HttpClient,
    private jwtService: JwtHelperService
    ) { }

  setRedirectUrl(url: string): void {
    this.redirectUrl = url;
  }

  getLoginUrl(): string {
    return 'login';
  }

  login(authData: AuthData) {
    let token: string;
    this.http.post('http://localhost:3000/api/users/login', authData)
              .subscribe( (data: LoginData) => {
                token = data.token.replace('Bearer ', '');
                localStorage.setItem('token', token);
                localStorage.setItem('isAuth', 'true');
                this.router.navigate(['dashboard']);
              });
    //  // Just set the global auth state to logged in for the moment
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('isAuth');
    this.router.navigate(['login']);
  }

  isAuthenticated(): boolean {
    const state = localStorage.getItem('isAuth');
    const token = localStorage.getItem('token');
    // this.jwtService.isTokenExpired('fake-jwt-token');
    // if (!this.jwtService.isTokenExpired(token)) {
    //     return true;
    // }
    // return false;
    if (state === 'true') {
      return true;
    }
    return false;
  }

  // Subscribe to auth state to implements redirection based on
  initAuthListener() {
  }

}
