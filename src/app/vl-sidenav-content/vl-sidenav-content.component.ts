import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-vl-sidenav-content',
  templateUrl: './vl-sidenav-content.component.html',
  styleUrls: ['./vl-sidenav-content.component.css']
})
export class VlSidenavContentComponent implements OnInit {

  @Input() tabs: any[] = [];

  constructor() {
  }

  ngOnInit(): void {
  }

}
