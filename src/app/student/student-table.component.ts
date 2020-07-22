import {Component, Input, OnInit} from '@angular/core';
import {Student} from './student.model';

@Component({
  selector: 'app-student-table',
  templateUrl: './student-table.component.html',
  styleUrls: ['./student-table.component.css']
})
export class StudentTableComponent implements OnInit {

  @Input() students: Student[] = [];

  constructor() {
  }

  ngOnInit(): void {
  }

}
