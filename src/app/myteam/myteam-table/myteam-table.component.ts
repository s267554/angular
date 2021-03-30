import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MyTeam} from '../myteam.model';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {Team} from '../../team/team.model';
import {AuthService} from '../../auth/auth.service';

@Component({
  selector: 'app-myteam-table',
  templateUrl: './myteam-table.component.html',
  styleUrls: ['./myteam-table.component.css'],
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
export class MyTeamTableComponent implements OnInit {

  // tslint:disable-next-line:variable-name
  private readonly _action$ = new EventEmitter<any>();
  @Output() readonly action$ = this._action$.asObservable();

  // tslint:disable-next-line:variable-name
  _userId: string;

  activeTeam: MyTeam;

  get myTeams(): MyTeam[] {
    return this._myTeams;
  }

  set myTeams(myTeams: MyTeam[]) {
    myTeams.forEach(element => {
      if (element.enabled || element.invalid || element === this.activeTeam) {
        element.expiryDate = '';
      }
      else {
        element.expiryDate = this.calcExpiration(element.expiryDate);
      }
    });
    this._myTeams = myTeams;
  }

  constructor(private readonly authService: AuthService) {
    this._userId = this.authService.getUserId();
  }

  @Input() displayedColumns = ['name', 'creator', 'expiryDate', 'actions'];

  // tslint:disable-next-line:variable-name
  _myTeams = [];

  ngOnInit(): void {
  }

  action(teamName: string, actionName: string) {
    this._action$.emit({teamName, actionName});
  }


  calcExpiration(expiryDate: string): string {
    const now = Date.now();
    const time = new Date(expiryDate).getTime() - now;
    let rem: string;
    const secs: number = Math.abs(time) / 1000;
    const mins: number = secs / 60;
    const hs: number = mins / 60;
    const ds: number = hs / 24;

    if (ds > 1) {
      rem = Math.floor(ds) + ' days';
    }
    else if (hs > 1) {
      rem = Math.floor(hs) + ' hours';
    }
    else if (mins > 1) {
      rem = Math.floor(mins) + ' minutes';
    }
    else {
      rem = Math.floor(secs) + ' seconds';
    }
    if (time > 0) {
      return rem + ' left';
    }
    else {
      return 'Expired ' + rem + ' ago';
    }
  }
}
