import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {VirtualMachine} from '../virtual-machine';
import {VmDialogContComponent} from '../vm-dialog-cont/vm-dialog-cont.component';

@Component({
  selector: 'app-vms-stud-tab',
  templateUrl: './vms-stud-tab.component.html',
  styleUrls: ['./vms-stud-tab.component.css']
})
export class VmsStudTabComponent implements OnInit {

  constructor(private readonly dialog: MatDialog) { }

  ngOnInit(): void {
  }

  createVM() {
    this.dialog.open(VmDialogContComponent, {data: null});
  }

  updateVM($event: VirtualMachine) {
    this.dialog.open(VmDialogContComponent, {data: $event});
  }

}
