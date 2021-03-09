import {EventEmitter, Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {HttpClient} from '@angular/common/http';

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

  constructor(private readonly httpClient: HttpClient) {
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

  uploadImage(formData: FormData): any {
    const url = 'images';
    return this.httpClient.post<any>(url, formData);
  }

}
