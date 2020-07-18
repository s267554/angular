import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {AuthService} from './auth/auth.service';
import {Subscription} from 'rxjs';
import {VlToolbarComponent} from './widget/vl-toolbar.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  @ViewChild('vlToolbar') private readonly vlToolbar: VlToolbarComponent;
  title = 'virtual-labs';

  private loginSub: Subscription = null;

  constructor(private readonly authService: AuthService) {
  }

  ngOnDestroy(): void {
    if (this.loginSub !== null) {
      this.loginSub.unsubscribe();
      this.loginSub = null;
    }
  }

  ngOnInit(): void {
    this.loginSub = this.authService.loginEvent$.subscribe((e) => {
     this.vlToolbar.loginButtonText = e != null ? 'Logout' : 'Login';
     this.vlToolbar.menuButtonVisible = e != null;
    });
  }
}
