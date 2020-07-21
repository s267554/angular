import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, Subscription, timer} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {retry, tap} from 'rxjs/operators';
import {User} from '../model/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly ROOT_URL = 'http://localhost:8080/auth/';

  private readonly OPTIONS = {
    responseType: 'json' as const,
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  // tslint:disable-next-line:variable-name
  private readonly _loginEvent$ = new BehaviorSubject<User>(null);
  readonly loginEvent$ = this._loginEvent$.asObservable();

  private timerSub: Subscription = null;

  constructor(private readonly httpClient: HttpClient) {
  }

  register(request: any): Observable<any> {
    const url = this.ROOT_URL + 'register';
    return this.httpClient.post(url, request, this.OPTIONS).pipe(
      retry(3)
    );
  }

  login(username: string, password: string): Observable<User> {
    const url = this.ROOT_URL + 'login';
    const body = {
      username,
      password
    };
    return this.httpClient.post<User>(url, body, this.OPTIONS).pipe(
      retry(3),
      tap((u) => {
        this.setupTimeout(u.expiry);
        this._loginEvent$.next(u);
      })
    );
  }

  logout() {
    this.stopTimer();
    this._loginEvent$.next(null);
  }

  getToken(): string | null {
    const user = this._loginEvent$.getValue();
    return user !== null ? user.token : null;
  }

  private stopTimer() {
    if (this.timerSub !== null) {
      this.timerSub.unsubscribe();
      this.timerSub = null;
    }
  }

  private setupTimeout(timeoutInMillis: number) {
    this.stopTimer();
    this.timerSub = timer(timeoutInMillis).subscribe(() => {
      this.logout();
    });
  }

}
