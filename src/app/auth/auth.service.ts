import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, Subscription, timer} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {retry, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly ROOT_URL = 'http://localhost:8080/';
  private readonly TIMEOUT = 3600 * 1000;

  // tslint:disable-next-line:variable-name
  private readonly _loginEvent$: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  readonly loginEvent$: Observable<any> = this._loginEvent$.asObservable();

  private timerSub: Subscription = null;

  constructor(private readonly httpClient: HttpClient) {
  }

  register(request: any): Observable<any> {
    const url = this.ROOT_URL + 'register';
    return this.httpClient.post(url, request).pipe(
      retry(3)
    );
  }

  login(username: string, password: string): Observable<any> {
    const url = this.ROOT_URL + 'login';
    const body = {
      username,
      password
    };
    return this.httpClient.post(url, body).pipe(
      retry(3),
      tap((r) => {
        this.setupTimeout(this.TIMEOUT);
        this._loginEvent$.next(r);
      })
    );
  }

  logout() {
    this.stopTimer();
    this._loginEvent$.next(null);
  }

  getToken(): string {
    return this._loginEvent$.getValue();
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
