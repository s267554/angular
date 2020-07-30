import {Component, Input, OnInit} from '@angular/core';
import {VirtualMachine} from './virtual-machine';

@Component({
  selector: 'app-vms-table',
  templateUrl: './vms-table.component.html',
  styleUrls: ['./vms-table.component.css']
})
export class VmsTableComponent implements OnInit {

  @Input() displayedColumns: string[] = ['id', 'status', 'url'];

  @Input() vms: VirtualMachine[] = [];

  constructor() {
  }

  ngOnInit(): void {
  }

}
