import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InterceptTokenService implements HttpInterceptor {

  constructor() { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!request.url.includes("spotify.com")) {
      request = request.clone({
        setHeaders: {
          Authorization: `JWT ${localStorage.getItem('access_token')}`
        }
      });
    }
    return next.handle(request);
  }

}
