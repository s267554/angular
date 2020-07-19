import {Component, Input, OnInit} from '@angular/core';
import {Course} from '../model/course.model';

@Component({
  selector: 'app-vl-sidenav',
  templateUrl: './vl-sidenav.component.html',
  styleUrls: ['./vl-sidenav.component.css']
})
export class VlSidenavComponent implements OnInit {

  @Input() courses: Course[] = [];

  constructor() {
  }

  ngOnInit(): void {
  }

}
