import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {AuthService} from './auth/auth.service';
import {Subscription} from 'rxjs';
import {VlToolbarComponent} from './vltoolbar/vl-toolbar.component';
import {LoginDialogComponent} from './login/login-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('vlToolbar') private readonly vlToolbar: VlToolbarComponent;
  title = 'virtual-labs';

  private loginSub: Subscription = null;

  constructor(private readonly authService: AuthService, private readonly dialog: MatDialog, private readonly router: Router) {
  }

  private openLoginDialog(url: string) {
    const dialogRef = this.dialog.open(LoginDialogComponent, {
      width: '25%'
    });
    dialogRef.afterClosed().toPromise().then((value) => {
      const success = value !== null && value !== undefined ? value : false;
      if (success && url !== null) {
        return this.router.navigate([url]);
      }
    });
  }

  toggleLogin(login: boolean) {
    if (login) {
      this.openLoginDialog('');
    } else {
      this.authService.logout();
    }
  }

  ngOnDestroy(): void {
    if (this.loginSub !== null) {
      this.loginSub.unsubscribe();
      this.loginSub = null;
    }
  }

  ngOnInit(): void {


  }

  ngAfterViewInit(): void {
    this.loginSub = this.authService.loginEvent$.subscribe((e) => {
      this.vlToolbar.login = e !== null;
    });
  }

}
