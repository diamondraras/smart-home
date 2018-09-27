import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { FormsModule } from '@angular/forms';
import { JwtModule, JWT_OPTIONS } from '@auth0/angular-jwt';


import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { HeaderComponent } from './shared/header/header.component';
import { SidebarComponent } from './shared/header/sidebar/sidebar.component';
import { NavComponent } from './shared/header/nav/nav.component';
import { FooterComponent } from './shared/footer/footer.component';

import { LoginComponent } from './views/login/login.component';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { RegisterComponent } from './views/register/register.component';
import { AuthModule } from './auth/auth.module';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { reducers } from './app.reducer';
import { AuthEffects } from './auth/auth.effects';

import { AddHeaderInterceptor } from './_helpers/token-injector';

export function tokenGetter() {
  return localStorage.getItem('token');
}

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidebarComponent,
    NavComponent,
    FooterComponent,
    LoginComponent,
    DashboardComponent,
    RegisterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    AuthModule,
    StoreModule.forRoot(reducers),
    StoreDevtoolsModule.instrument(),
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: ['localhost:3000', '192.168.10.29:3000'],
        authScheme: ''
      }
    }),
    EffectsModule.forRoot([AuthEffects])
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AddHeaderInterceptor,
      multi: true,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
