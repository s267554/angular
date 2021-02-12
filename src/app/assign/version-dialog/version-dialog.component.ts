import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Version} from '../version.model';

@Component({
  selector: 'app-version-dialog',
  templateUrl: './version-dialog.component.html',
  styleUrls: ['./version-dialog.component.css']
})
export class VersionDialogComponent implements OnInit {

// tslint:disable-next-line:variable-name
  private readonly _save$ = new EventEmitter<Version>();
  @Output() readonly save$ = this._save$.asObservable();

  constructor() {
  }


  url: string;

  save() {
    const v: Version = {
      date: new Date(),
      contentUrl: this.url,
      id: 0
    };
    this._save$.emit(v);
  }

  ngOnInit(): void {
  }

}
