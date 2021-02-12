import {Injectable} from '@angular/core';
import {BehaviorSubject, iif, merge, Observable, of} from 'rxjs';
import {VlService} from '../vl.service';
import {map, retry, shareReplay, switchMap} from 'rxjs/operators';
import {AssignService} from './assign.service';
import {Assignment} from './assign.model';
import {Paper} from './paper.model';
import {Version} from './version.model';
import {VirtualMachine} from '../vms/virtual-machine';

@Injectable({
  providedIn: 'root'
})
export class AssignStore {

  // tslint:disable-next-line:variable-name
  _assign$ = new BehaviorSubject<Assignment[]>([]);
  readonly assign$ = this._assign$.asObservable();

  constructor(private readonly assignService: AssignService,
              private readonly vlService: VlService) {
    this.assignService.getAssignments(vlService.getCourse()).subscribe(as => this._assign$.next(as));
  }

  addAssignment(assignment: Assignment) {
    this._assign$.next(this._assign$.value.concat(assignment));
  }

  private _assign(courseName: string | null): Observable<Assignment[]> {
    return iif(
      () => courseName !== null,
      this.assignService.getAssignments(courseName),
      of([])
    ).pipe(
      retry(3),
      shareReplay()
    );
  }

  papers$(assignmentId: number): Observable<Paper[]> {
    return this.assignService.getPapers(assignmentId).pipe(
      retry(3)
    );
  }

  version$(assignmentId: number, studentName: string): Observable<Version[]> {
    return this.assignService.getVersions(assignmentId, studentName).pipe(
      retry(3)
    );
  }


}
