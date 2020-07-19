import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-vl-toolbar',
  templateUrl: './vl-toolbar.component.html',
  styleUrls: ['./vl-toolbar.component.css']
})
export class VlToolbarComponent {

  @Output() toggleLogin$ = new EventEmitter<boolean>();

  @Output() toggleSidenav$ = new EventEmitter<any>();

  @Output() homeClick$ = new EventEmitter<any>();

  @Input() login = false;

  toggleLogin() {
    const doLogin = !this.login;
    this.toggleLogin$.emit(doLogin);
  }

  toggleSidenav(event: any) {
    this.toggleSidenav$.emit(event);
  }

  homeClick(event: any) {
    this.homeClick$.emit(event);
  }

}
