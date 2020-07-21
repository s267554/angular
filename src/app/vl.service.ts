import {EventEmitter, Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class VlService {

// tslint:disable-next-line:variable-name
  private readonly _sidenav$ = new EventEmitter<any>();
  readonly sidenav$ = this._sidenav$.asObservable();

  constructor() {
  }

  toggleSidenav() {
    this._sidenav$.next(null);
  }

}
