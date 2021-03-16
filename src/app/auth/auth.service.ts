import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, Subscription, timer} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {retry, tap} from 'rxjs/operators';
import {User} from './user.model';
import {Router} from '@angular/router';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {VlProfileDialogComponent} from '../vl-profile-dialog/vl-profile-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // tslint:disable-next-line:variable-name
  private readonly _loginEvent$ = new BehaviorSubject<User>(null);
  readonly loginEvent$ = this._loginEvent$.asObservable();

  private timerSub: Subscription = null;

  constructor(private readonly httpClient: HttpClient,
              private readonly router: Router,
              private dialog: MatDialog) {
  }

  register(request: any): Observable<any> {
    const url = 'auth/register';
    return this.httpClient.post(url, request).pipe(
      retry(3)
    );
  }

  login(username: string, password: string): Observable<User> {
    const url = 'auth/login';
    const body = {
      username,
      password
    };
    return this.httpClient.post<User>(url, body).pipe(
      retry(3),
      tap((u) => {
        this.setupTimeout(u.expiry);
        this._loginEvent$.next(u);
      }),
    );
  }

  logout() {
    this.stopTimer();
    this._loginEvent$.next(null);
    this.router.navigate(['home']);
  }

  getToken(): string | null {
    const user = this._loginEvent$.getValue();
    return user !== null ? user.token : null;
  }

  getUserId(): string | null {
    const user = this._loginEvent$.getValue();
    return user !== null ? user.username.split('@')[0] : null;
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

  toggleProfile() {
    const config = new MatDialogConfig();
    config.data = this._loginEvent$.getValue();
    this.dialog.open(VlProfileDialogComponent, config);
  }
}
