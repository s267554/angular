import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Student} from './student.model';

@Component({
  selector: 'app-student-tab',
  templateUrl: './student-tab.component.html',
  styleUrls: ['./student-tab.component.css']
})
export class StudentTabComponent implements OnInit {

  // tslint:disable-next-line:variable-name
  private readonly _enrollOne$ = new EventEmitter<Student>();
  @Output() readonly enrollOne$ = this._enrollOne$.asObservable();

  // tslint:disable-next-line:variable-name
  private readonly _enrollMany$ = new EventEmitter<any>();
  @Output() readonly enrollMany$ = this._enrollMany$.asObservable();

  // tslint:disable-next-line:variable-name
  private readonly _dropOutAll$ = new EventEmitter<Student[]>();
  @Output() readonly dropOutAll$ = this._dropOutAll$.asObservable();

  // tslint:disable-next-line:variable-name
  private readonly _search$ = new EventEmitter<string>();
  @Output() readonly search$ = this._search$.asObservable();

  @Input() enrolled: Student[] = [];

  @Input() searchResult: Student[] = [];

  constructor() {
  }

  ngOnInit(): void {

  }

  dropOutAll(students: Student[]) {
    this._dropOutAll$.emit(students);
  }

  enrollOne(student: Student) {
    this._enrollOne$.emit(student);
  }

  enrollMany(formdata: any) {
    this._enrollMany$.emit(formdata);
  }

  search(query: string) {
    this._search$.emit(query);
  }

}
