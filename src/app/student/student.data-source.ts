import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {BehaviorSubject, merge, Observable} from 'rxjs';
import {Student} from './student.model';
import {DataSource} from '@angular/cdk/collections';
import {map, tap} from 'rxjs/operators';

export class StudentDataSource extends DataSource<Student> {

  // tslint:disable-next-line:variable-name
  private readonly _data$ = new BehaviorSubject<Student[]>([]);

  // tslint:disable-next-line:variable-name
  private readonly _page$ = new BehaviorSubject<Student[]>([]);
  readonly page$ = this._page$.asObservable();

  paginator: MatPaginator;

  sort: MatSort;

  constructor() {
    super();
  }

  emit(students: Student[]) {
    this._data$.next(students);
  }

  getData(): Student[] {
    return this._data$.getValue();
  }

  getPage(): Student[] {
    return this._page$.getValue();
  }

  connect(): Observable<Student[]> {

    const dataMutations = [
      this._data$,
      this.paginator.page,
      this.sort.sortChange
    ];

    return merge(...dataMutations).pipe(
      map(() => {
        return this.getPagedData(this.getSortedData([...this._data$.getValue()]));
      }),
      tap((data) => {
        this._page$.next(data);
      })
    );
  }

  disconnect() {
  }

  private getPagedData(data: Student[]): Student[] {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    return data.splice(startIndex, this.paginator.pageSize);
  }

  private getSortedData(data: Student[]): Student[] {
    if (!this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort.direction === 'asc';
      const prop1 = a[this.sort.active];
      const prop2 = b[this.sort.active];
      if (isStringOrNumber(prop1) && isStringOrNumber(prop2)) {
        return compare(prop1, prop2, isAsc);
      } else {
        return 0;
      }
    });
  }

}

function isStringOrNumber(value: any): boolean {
  return typeof value === 'string' || typeof value === 'number';
}

function compare(a: string | number, b: string | number, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
