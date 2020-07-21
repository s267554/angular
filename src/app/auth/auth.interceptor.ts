import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AuthService} from './auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private readonly authService: AuthService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    // Get token from the service.
    const token = this.authService.getToken();

    let authReq = request;

    // If token is not null, clone the request and replace the original headers with
    // cloned headers, updated with the authorization.
    if (token !== null) {
      authReq = request.clone({
        headers: request.headers.set('Authorization', 'Bearer ' + token)
      });
    }

    return next.handle(authReq);
  }

}
