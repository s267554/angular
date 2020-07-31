import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Team} from '../team.model';

@Component({
  selector: 'app-team-tab',
  templateUrl: './team-tab.component.html',
  styleUrls: ['./team-tab.component.css']
})
export class TeamTabComponent implements OnInit {

  // tslint:disable-next-line:variable-name
  private readonly _update$ = new EventEmitter<Team>();
  @Output() readonly update$ = this._update$.asObservable();

  @Input() teams: Team[] = [];

  constructor() {
  }

  ngOnInit(): void {
  }

  update(team: Team) {
    this._update$.emit(team);
  }

}
