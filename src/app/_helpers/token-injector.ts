import {
    HttpEvent,
    HttpInterceptor,
    HttpHandler,
    HttpRequest,
  } from '@angular/common/http';
// import { AuthService } from '../auth/auth.service';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
  export class AddHeaderInterceptor implements HttpInterceptor {
    //   constructor(private authService: AuthService) {

    //   }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      // Clone the request to add the new header
      const token = '1234';
      const clonedRequest = req.clone({ headers: req.headers.set('x-ha-access', token) });
      // Pass the cloned request instead of the original request to the next handle
      return next.handle(clonedRequest);
    }
  }