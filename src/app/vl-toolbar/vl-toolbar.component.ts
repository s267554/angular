import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-vl-toolbar',
  templateUrl: './vl-toolbar.component.html',
  styleUrls: ['./vl-toolbar.component.css']
})
export class VlToolbarComponent {

  // tslint:disable-next-line:variable-name
  private readonly _toggleLogin$ = new EventEmitter<boolean>();
  @Output() readonly toggleLogin$ = this._toggleLogin$.asObservable();

  // tslint:disable-next-line:variable-name
  private readonly _toggleSignup$ = new EventEmitter<any>();
  @Output() readonly toggleSignup$ = this._toggleSignup$.asObservable();

  // tslint:disable-next-line:variable-name
  private readonly _toggleProfile$ = new EventEmitter<any>();
  @Output() readonly toggleProfile$ = this._toggleProfile$.asObservable();

  // tslint:disable-next-line:variable-name
  private readonly _toggleSidenav$ = new EventEmitter<any>();
  @Output() readonly toggleSidenav$ = this._toggleSidenav$.asObservable();

  // tslint:disable-next-line:variable-name
  private readonly _titleClick$ = new EventEmitter<any>();
  @Output() readonly titleClick$ = this._titleClick$.asObservable();

  @Input() login = false;

  toggleLogin() {
    const doLogin = !this.login;
    this._toggleLogin$.emit(doLogin);
  }

  toggleSidenav(event: any) {
    this._toggleSidenav$.emit(event);
  }

  titleClick(event: any) {
    this._titleClick$.emit(event);
  }

  toggleSignup() {
    this._toggleSignup$.emit();
  }

  toggleProfile() {
    this._toggleProfile$.emit();
  }

}
