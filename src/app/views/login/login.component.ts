import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { AuthData } from '../../auth/auth-data.model';
import { Store } from '@ngrx/store';
import * as fromRoot from './../../app.reducer';
import * as fromAuth from './../../auth/auth.actions';

export class User {
  email = 'admin@mail.com';
  password = 'password';
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: User = new User();

  constructor(
    private authService: AuthService,
    private store: Store<fromRoot.State>
    ) { }

  ngOnInit() {
  }

  login() {
    let authData: AuthData = {
      email: 'admin@mail.com',
      password: 'password'
    };
    // this.authService.login(authData);
  }
  logout() {
    this.authService.logout();
  }

  onSubmit() {
    const payload  = {
      email: this.user.email,
      password: this.user.password
    };
    this.store.dispatch(new fromAuth.Login(payload));
  }
}
