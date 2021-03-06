import {Injectable} from '@angular/core';
import {Course} from './course.model';
import {BehaviorSubject, Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {shareReplay, tap} from 'rxjs/operators';
import {VlService} from '../vl.service';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  private readonly URL = 'api/courses/';

  // tslint:disable-next-line:variable-name
  private readonly _courses$ = new BehaviorSubject<Course[]>([]);
  readonly courses$ = this._courses$.asObservable();

  constructor(private readonly httpClient: HttpClient,
              private readonly vlService: VlService) {
  }

  // need full Course object as VlService.getCourse returns string
  getCourse(coursename: string): Course {
    return this._courses$.getValue().find((c) => c.name === coursename);
  }

  getCourses(): Observable<Course[]> {
    this._courses$.next([]);
    return this.httpClient.get<Course[]>(this.URL).pipe(
      tap((c) => {
        this._courses$.next(c);
      }),
      shareReplay()
    );
  }

  deleteCourse(course: Course): Observable<any> {
    const oldList: Course[] = this._courses$.getValue();
    const newList: Course[] = [];
    oldList.forEach((c) => {
      if (c.name !== course.name) {
        newList.push(c);
      }
    });
    this._courses$.next(newList);
    const url = this.URL + course.name;
    return this.httpClient.delete(url).pipe(
      tap(
        () => {
        },
        () => {
          this._courses$.next(oldList);
        }
      ),
      shareReplay()
    );
  }

  updateCourse(course: Course): Observable<any> {
    const oldList: Course[] = this._courses$.getValue();
    const newList: Course[] = [];
    oldList.forEach((c) => {
      if (c.name !== course.name) {
        newList.push(c);
      } else {
        newList.push(course);
      }
    });
    this._courses$.next(newList);
    return this.httpClient.put(this.URL, course).pipe(
      tap(
        () => {
        },
        () => {
          this._courses$.next(oldList);
        }
      ),
      shareReplay()
    );
  }

  createCourse(course: Course): Observable<any> {
    const oldList: Course[] = this._courses$.getValue();
    const newList: Course[] = [];
    oldList.forEach((c) => {
      newList.push(c);
    });
    newList.push(course);
    this._courses$.next(newList);
    return this.httpClient.post(this.URL, course).pipe(
      tap(
        () => {
        },
        () => {
          this._courses$.next(oldList);
        }
      ),
      shareReplay()
    );
  }

}
