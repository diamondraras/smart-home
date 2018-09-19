import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { AuthData } from '../../auth/auth-data.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  login() {
    let authData: AuthData = {
      email: 'admin@mail.com',
      password: 'password'
    };
    this.authService.login(authData);
  }
  logout() {
    this.authService.logout();
  }
}
