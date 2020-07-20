import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {Course} from '../model/course.model';
import {MatSidenav} from '@angular/material/sidenav';

@Component({
  selector: 'app-vl-sidenav',
  templateUrl: './vl-sidenav.component.html',
  styleUrls: ['./vl-sidenav.component.css']
})
export class VlSidenavComponent implements OnInit {
  @ViewChild('sidenav') private readonly sidenav: MatSidenav;
  @Input() courses: Course[] = [];

  constructor() {
  }

  ngOnInit(): void {
  }

  toggle() {
    this.sidenav.toggle().then();
  }

}
