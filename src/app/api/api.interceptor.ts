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
    // !!!! There is actually no need to explicitly set content type
    // temp workaround for file upload that need multipart content type
    // match multipart request in a decent way
    // if (!request.url.includes('enrollMany') && !request.url.includes('image')) {
    //   return next.handle(request.clone({
    //     url: this.ROOT_URL + request.url,
    //     ...this.OPTIONS
    //   }));
    // }
    return next.handle(request.clone({
      url: this.ROOT_URL + request.url
    }));
  }
}
