import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {StudentViewModel} from './student.view-model';
import {ActivatedRoute} from '@angular/router';
import {switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-student-tab-cont',
  templateUrl: './student-tab-cont.component.html',
  styleUrls: ['./student-tab-cont.component.css'],
  providers: [StudentViewModel]
})
export class StudentTabContComponent implements OnInit, OnDestroy {

  private subs: Subscription[] = [];

  constructor(readonly studentViewModel: StudentViewModel,
              private readonly route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.subs.push(
      this.route.params.pipe(
        switchMap((p) => {
          return this.studentViewModel.getEnrolled(p.courseName);
        })
      ).subscribe()
    );
  }

  ngOnDestroy(): void {
    this.subs.forEach((s) => {
      s.unsubscribe();
    });
    this.subs = [];
  }

}
