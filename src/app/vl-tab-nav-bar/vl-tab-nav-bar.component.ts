import {Component, Input, OnInit} from '@angular/core';
import {Tab} from './tab.model';

@Component({
  selector: 'app-vl-tab-nav-bar',
  templateUrl: './vl-tab-nav-bar.component.html',
  styleUrls: ['./vl-tab-nav-bar.component.css']
})
export class VlTabNavBarComponent implements OnInit {

  @Input() title = '';

  @Input() tabs: Tab[] = [];

  constructor() {
  }

  ngOnInit(): void {
  }

}
