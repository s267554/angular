import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Course} from '../course/course.model';
import {isAdmin, User} from '../auth/user.model';

@Component({
  selector: 'app-vl-sidenav',
  templateUrl: './vl-sidenav.component.html',
  styleUrls: ['./vl-sidenav.component.css']
})
export class VlSidenavComponent implements OnInit {

  // tslint:disable-next-line:variable-name
  private readonly _delete$ = new EventEmitter<Course>();
  @Output() readonly delete$ = this._delete$.asObservable();

  // tslint:disable-next-line:variable-name
  private readonly _create$ = new EventEmitter<any>();
  @Output() readonly create$ = this._create$.asObservable();

  // tslint:disable-next-line:variable-name
  private readonly _update$ = new EventEmitter<Course>();
  @Output() readonly update$ = this._update$.asObservable();

  @Input() courses: Course[] = [];

  @Input() set user(user: User | null) {
    this.editable = isAdmin(user);
  }

  @Input() editable = false;

  constructor() {
  }

  ngOnInit(): void {
  }

  update(c: Course) {
    this._update$.emit(c);
  }

  create() {
    this._create$.emit(null);
  }

  delete(c: Course) {
    this._delete$.emit(c);
  }

}
