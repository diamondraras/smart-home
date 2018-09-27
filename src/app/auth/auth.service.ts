import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromRoot from './../app.reducer';
import * as fromAuth from './auth.actions';
import { take } from 'rxjs/operators';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthData } from './auth-data.model';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';

/* TODO: Implement token expiration verification
*/
interface LoginData {
  token: string;
}

@Injectable()
export class AuthService {
  redirectUrl: string ;
  BASE_URL = 'http://192.168.10.29:3000/api';

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

  login(email: string, password: string): Observable<any> {
    const url = `${this.BASE_URL}/users/login`;
    return this.http.post(url, {email, password});
  }

  logout() {
    this.store.dispatch(new fromAuth.Logout());
  }

  isAuthenticated(): boolean {
    const state = localStorage.getItem('isAuth');
    const token = localStorage.getItem('token');
    // this.jwtService.isTokenExpired('fake-jwt-token');
    // if (!this.jwtService.isTokenExpired(token)) {
    //     return true;
    // }
    // return false;
    if (token) {
      return true;
    }
    return false;
  }

  getHAToken() {
    return '1234';
  }
}
