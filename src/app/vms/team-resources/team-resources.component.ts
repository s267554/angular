import {Component, Input, OnInit} from '@angular/core';
import {Team} from '../../team/team.model';

@Component({
  selector: 'app-team-resources',
  templateUrl: './team-resources.component.html',
  styleUrls: ['./team-resources.component.css']
})
export class TeamResourcesComponent implements OnInit {

  @Input() totcpu: number;
  @Input() totram: number;
  @Input() totspace: number;
  @Input() team: Team;

  constructor() { }

  ngOnInit(): void {
  }

}
