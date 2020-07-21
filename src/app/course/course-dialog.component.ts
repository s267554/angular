import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Course} from './course.model';

@Component({
  selector: 'app-course-dialog',
  templateUrl: './course-dialog.component.html',
  styleUrls: ['./course-dialog.component.css']
})
export class CourseDialogComponent implements OnInit {

  // tslint:disable-next-line:variable-name
  private readonly _save$ = new EventEmitter<Course>();
  @Output() readonly save$ = this._save$.asObservable();

  @Input() name = '';

  @Input() acronym = '';

  @Input() enabled = false;

  @Input() max = 1;

  @Input() min = 1;

  @Input() isNew = true;

  @Input() set course(c: Course | null) {
    if (c !== null) {
      this.setupCourse(c);
    } else {
      this.setupNew();
    }
  }

  constructor() {
  }

  ngOnInit(): void {
  }

  private setupNew() {
    this.name = '';
    this.acronym = '';
    this.enabled = false;
    this.max = 1;
    this.min = 1;
    this.isNew = true;
  }

  private setupCourse(c: Course) {
    this.name = c.name;
    this.acronym = c.acronym;
    this.enabled = c.enabled;
    this.max = c.max;
    this.min = c.min;
    this.isNew = false;
  }

  save() {
    const course = {
      name: this.name,
      acronym: this.acronym,
      enabled: this.enabled,
      max: this.max,
      min: this.min
    };
    this._save$.emit(course);
  }

}
