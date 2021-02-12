import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {VirtualMachine} from '../../vms/virtual-machine';
import {Assignment} from '../assign.model';

@Component({
  selector: 'app-assign-dialog',
  templateUrl: './assign-dialog.component.html',
  styleUrls: ['./assign-dialog.component.css']
})
export class AssignDialogComponent implements OnInit {

// tslint:disable-next-line:variable-name
  private readonly _save$ = new EventEmitter<Assignment>();
  @Output() readonly save$ = this._save$.asObservable();

  constructor() {
  }

  expiry: Date;

  url: string;

  save() {
    const a: Assignment = {
      creationDate: this.expiry,
      expiryDate: this.expiry,
      id: 0,
      contentUrl: 'https://google.com',
    };
    this._save$.emit(a);
  }

  ngOnInit(): void {
  }
}
