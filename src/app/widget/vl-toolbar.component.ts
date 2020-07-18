import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-vl-toolbar',
  templateUrl: './vl-toolbar.component.html',
  styleUrls: ['./vl-toolbar.component.css']
})
export class VlToolbarComponent implements OnInit {
  @Input() menuButtonVisible = true;
  @Input() loginButtonText = 'Login';
  @Output() loginButtonEvent = new EventEmitter<any>();
  @Output() menuButtonEvent = new EventEmitter<any>();
  @Output() titleButtonEvent = new EventEmitter<any>();

  constructor() {
  }

  ngOnInit(): void {
  }

}
