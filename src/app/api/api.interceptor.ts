import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {

  private readonly ROOT_URL = 'http://localhost:8080/';
  private readonly OPTIONS = {
    responseType: 'json' as const,
    setHeaders: {
      'Content-Type': 'application/json'
    }
  };

  constructor() {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // temp workaround for file upload that need multipart content type
    if (!request.url.includes('enrollMany')) {
      return next.handle(request.clone({
        url: this.ROOT_URL + request.url,
        ...this.OPTIONS
      }));
    }
    return next.handle(request.clone({
      url: this.ROOT_URL + request.url
    }));
  }
}
