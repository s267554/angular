import {Component, OnDestroy, OnInit} from '@angular/core';
import {StudentService} from './student.service';
import {Subscription} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-student-table-cont',
  templateUrl: './student-table-cont.component.html',
  styleUrls: ['./student-table-cont.component.css']
})
export class StudentTableContComponent implements OnInit, OnDestroy {

  private subs: Subscription[] = [];

  constructor(readonly studentService: StudentService,
              private readonly route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.subs.push(
      this.route.params.pipe(
        switchMap((params) => {
          return this.studentService.getEnrolledStudents(params.courseName);
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
