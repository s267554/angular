import {Component, Input, OnInit} from '@angular/core';
import {Team} from './team.model';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-team-table',
  templateUrl: './team-table.component.html',
  styleUrls: ['./team-table.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed',
        style({
          height: '0px',
          minHeight: '0',
          visibility: 'hidden'
        })
      ),
      state('expanded',
        style({
          height: '*',
          visibility: 'visible'
        })
      ),
      transition('expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      )
    ])
  ]
})
export class TeamTableComponent implements OnInit {

  constructor() {
  }

  // tslint:disable-next-line:variable-name
  private _teams = [];
  get teams(): Team[] {
    return this._teams;
  }

  @Input() set teams(teams: Team[]) {
    const rows = [];
    teams.forEach(element => rows.push(element, {detailRow: true, element}));
    this._teams = rows;
  }

  @Input() columns = ['name', 'edit'];

  expandedElement: any;

  isExpansionDetailRow(i: number, row: any) {
    return row.hasOwnProperty('detailRow');
  }

  ngOnInit(): void {
  }

  update(t: Team) {

  }

}
