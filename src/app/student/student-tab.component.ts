import {Component, Input, OnInit} from '@angular/core';
import {Student} from './student.model';

@Component({
  selector: 'app-student-tab',
  templateUrl: './student-tab.component.html',
  styleUrls: ['./student-tab.component.css']
})
export class StudentTabComponent implements OnInit {

  @Input() enrolled: Student[] = [];

  @Input() notEnrolled: Student[] = [];

  constructor() {
  }

  ngOnInit(): void {

  }

}
