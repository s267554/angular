import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {StudentViewModel} from './student.view-model';
import {ActivatedRoute} from '@angular/router';
import {switchMap, tap} from 'rxjs/operators';
import {Student} from './student.model';

@Component({
  selector: 'app-student-tab-cont',
  templateUrl: './student-tab-cont.component.html',
  styleUrls: ['./student-tab-cont.component.css'],
  providers: [StudentViewModel]
})
export class StudentTabContComponent implements OnInit, OnDestroy {

  private readonly parentRoute: ActivatedRoute;

  private initSub: Subscription = null;

  private subs: Subscription[] = [];

  constructor(readonly studentViewModel: StudentViewModel,
              route: ActivatedRoute) {
    this.parentRoute = route.parent;
  }

  ngOnInit(): void {
    this.initSub = this.parentRoute.params.pipe(
      tap(() => {
        this.clearSubs();
      }),
      switchMap((p) => {
        return this.studentViewModel.getEnrolled(p.courseName);
      })
    ).subscribe();
  }

  private clearSubs() {
    this.subs.forEach((s) => {
      s.unsubscribe();
    });
    this.subs = [];
  }

  ngOnDestroy(): void {
    if (this.initSub !== null) {
      this.initSub.unsubscribe();
      this.initSub = null;
    }
    this.clearSubs();
  }

  search(query: string) {
    this.subs.push(
      this.studentViewModel.search(query).subscribe()
    );
  }

  dropOutAll(students: Student[]) {
    this.subs.push(
      this.studentViewModel.dropOutAll(students).subscribe()
    );
  }

  enrollOne(student: Student) {
    this.subs.push(
      this.studentViewModel.enrollOne(student).subscribe()
    );
  }

  enrollMany(formData: any) {
    this.subs.push(
      this.studentViewModel.enrollMany(formData).subscribe()
    );
  }

}
