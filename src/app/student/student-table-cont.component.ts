import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Student} from './student.model';

@Component({
  selector: 'app-student-table-cont',
  templateUrl: './student-table-cont.component.html',
  styleUrls: ['./student-table-cont.component.css']
})
export class StudentTableContComponent implements OnInit {

  readonly students$: Observable<Student[]>;

  constructor() {
  }

  ngOnInit(): void {
  }

}
