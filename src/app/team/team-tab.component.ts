import {Component, Input, OnInit} from '@angular/core';
import {Team} from './team.model';

@Component({
  selector: 'app-team-tab',
  templateUrl: './team-tab.component.html',
  styleUrls: ['./team-tab.component.css']
})
export class TeamTabComponent implements OnInit {

  @Input() teams: Team[] = [];

  constructor() {
  }

  ngOnInit(): void {
  }

}
