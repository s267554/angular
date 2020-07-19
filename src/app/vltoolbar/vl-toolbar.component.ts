import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-vl-toolbar',
  templateUrl: './vl-toolbar.component.html',
  styleUrls: ['./vl-toolbar.component.css']
})
export class VlToolbarComponent {

  @Output() accountClick = new EventEmitter<any>();

  @Output() menuClick = new EventEmitter<any>();

  @Output() titleClick = new EventEmitter<any>();

  @Input() login = false;

}
