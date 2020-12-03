import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {VirtualMachine} from '../virtual-machine';

@Component({
  selector: 'app-vms-table',
  templateUrl: './vms-table.component.html',
  styleUrls: ['./vms-table.component.css']
})
export class VmsTableComponent implements OnInit {

  @Input() displayedColumns: string[] = ['id', 'status', 'url'];

  @Input() vms: VirtualMachine[] = [];

  // tslint:disable-next-line:variable-name
  private readonly _selectVM$ = new EventEmitter<VirtualMachine>();
  @Output() readonly selectVM$ = this._selectVM$.asObservable();

  constructor() {
  }

  ngOnInit(): void {
  }

  selectVM(vm: VirtualMachine) {
    this._selectVM$.emit(vm);
  }

}
