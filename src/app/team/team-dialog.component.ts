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

  // tslint:disable-next-line:variable-name
  private _team: Team;
  @Input() set team(team: Team) {
    this.name = team.name;
    this.vcpu = team.vcpu;
    this.ram = team.ram;
    this.space = team.space;
    this.maxVMsActive = team.maxVMsActive;
    this.maxVMs = team.maxVMs;
    this._team = team;
  }

  name: string;

  vcpu: number;

  ram: number;

  space: number;

  maxVMsActive: number;

  maxVMs: number;

  constructor() {
  }

  ngOnInit(): void {
  }

  save() {
    const t: Team = {
      name: this.name,
      courseName: this._team.courseName,
      vcpu: this.vcpu,
      ram: this.ram,
      space: this.space,
      maxVMsActive: this.maxVMsActive,
      maxVMs: this.maxVMs
    };
    this._update$.emit(t);
  }

}
