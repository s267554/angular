import {EventEmitter, Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VlService {

// tslint:disable-next-line:variable-name
  private readonly _sidenav$ = new EventEmitter<any>();
  readonly sidenav$ = this._sidenav$.asObservable();

  // tslint:disable-next-line:variable-name
  private readonly _course$ = new BehaviorSubject<string>(null);
  readonly course$ = this._course$.asObservable();

  constructor() {
  }

  toggleSidenav() {
    this._sidenav$.next(null);
  }

  selectCourse(courseName?: string | null | undefined) {
    let name = courseName;
    if (typeof name !== 'string') {
      name = null;
    }
    this._course$.next(name);
  }

  getCourse(): string | null {
    return this._course$.getValue();
  }

}
