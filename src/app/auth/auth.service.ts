import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {
  user = { isAdmin: false };
  redirectUrl: string ;

  checkPermissions() {
    return this.user.isAdmin;
  }
  isLoggedIn() {
    return true;
  }
  setRedirectUrl(url: string): void {
    this.redirectUrl = url;
  }
  getLoginUrl(): string {
    return 'login';
  }

  constructor() { }
}
