import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Team} from '../../team/team.model';
import {Student} from '../../student/student.model';
import {Proposal} from '../myteam.model';

@Component({
  selector: 'app-propose-dialog',
  templateUrl: './propose-dialog.component.html',
  styleUrls: ['./propose-dialog.component.css']
})
export class ProposeDialogComponent implements OnInit {

// tslint:disable-next-line:variable-name
  private readonly _propose$ = new EventEmitter<Proposal>();
  @Output() readonly propose$ = this._propose$.asObservable();

  // tslint:disable-next-line:variable-name
  _students: Student[];
  @Input() set students(students: Student[]) {
    this._students = students;
  }

  teamName: string;
  timeout: number;

  constructor() {
  }

  ngOnInit(): void {
  }

  propose() {
    const list: string[] = [];
    this._students.forEach(s => list.push(s.id));
    const proposal: Proposal = {
      name: this.teamName,
      timeout: this.timeout,
      ids: list
    };
    this._propose$.emit(proposal);
  }

}
