import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Team} from './team.model';

@Component({
  selector: 'app-team-dialog',
  templateUrl: './team-dialog.component.html',
  styleUrls: ['./team-dialog.component.css']
})
export class TeamDialogComponent implements OnInit {

  // tslint:disable-next-line:variable-name
  private readonly _update$ = new EventEmitter<Team>();
  @Output() readonly update$ = this._update$.asObservable();

  @Input() team: Team;

  constructor() {
  }

  ngOnInit(): void {
  }

  update() {

  }

}
