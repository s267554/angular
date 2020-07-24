import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Student} from './student.model';

@Component({
  selector: 'app-student-autocomplete',
  templateUrl: './student-autocomplete.component.html',
  styleUrls: ['./student-autocomplete.component.css']
})
export class StudentAutocompleteComponent implements OnInit {

  // tslint:disable-next-line:variable-name
  private readonly _add$ = new EventEmitter<Student>();
  @Output() readonly add$ = this._add$.asObservable();

  // tslint:disable-next-line:variable-name
  private readonly _search$ = new EventEmitter<string>();
  @Output() readonly search$ = this._search$.asObservable();

  // tslint:disable-next-line:variable-name
  private _students: Student[] = [];

  get students(): Student[] {
    return this._students;
  }

  @Input() set students(students: Student[]) {
    this._students = students;
    this.student = null;
  }

  private student: Student = null;

  constructor() {
  }

  ngOnInit(): void {
  }

  add() {
    const student = this.student;
    if (student !== null) {
      this._add$.emit(student);
    }
  }

  select(student: Student) {
    this.student = student;
  }

  display(student: Student): string {
    return student.id + ' ' + student.name + ' ' + student.surname;
  }

  search(event: KeyboardEvent) {
    const query = (event.target as HTMLInputElement).value.toLowerCase();
    this._search$.emit(query);
  }

}

function filter(list: Student[], query: string): Student[] {
  const students: Student[] = [];
  list.forEach((s) => {
    if (s.name.startsWith(query) || s.surname.startsWith(query) || s.id.startsWith(query)) {
      students.push(s);
    }
  });
  return students;
}
