import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { CanLoad, CanActivate, Route, Router } from '@angular/router';

@Injectable()
export class AuthGuard implements CanLoad, CanActivate {
    constructor(private authService: AuthService, private router: Router) {

    }

    canLoad(route: Route) {
        let url: string = route.path;
        console.log('Url: ' + url);
        if (this.authService.checkPermissions()) {
            return true;
        }
        this.authService.setRedirectUrl(url);
        this.router.navigate([ this.authService.getLoginUrl() ]);
        return false;
    }

    canActivate() {
        if (this.authService.checkPermissions()) {
            return true;
        }
        this.router.navigate([ this.authService.getLoginUrl() ]);
        return false;
    }
}
