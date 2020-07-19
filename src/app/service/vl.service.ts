import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VlService {

// tslint:disable-next-line:variable-name
  private readonly _sidenav$ = new BehaviorSubject<any>(null);
  readonly sidenav$ = this._sidenav$.asObservable();

  constructor() {
  }

  toggleSidenav() {
    this._sidenav$.next(null);
  }

}
