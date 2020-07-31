import {Component, Input, OnInit} from '@angular/core';
import {Student} from '../../student/student.model';
import {VirtualMachine} from '../virtual-machine';

@Component({
  selector: 'app-vm-tab',
  templateUrl: './vm-tab.component.html',
  styleUrls: ['./vm-tab.component.css']
})
export class VmTabComponent implements OnInit {

  @Input() vm: VirtualMachine = null;

  @Input() owners: Student[] = [];


  constructor() {
  }


  ngOnInit(): void {
  }

}
