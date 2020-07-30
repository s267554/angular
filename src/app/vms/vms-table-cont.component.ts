import {Component, OnInit} from '@angular/core';
import {VmsService} from './vms.service';

@Component({
  selector: 'app-vms-table-cont',
  templateUrl: './vms-table-cont.component.html',
  styleUrls: ['./vms-table-cont.component.css']
})
export class VmsTableContComponent implements OnInit {

  constructor(private readonly vmsService: VmsService) {
  }

  ngOnInit(): void {
  }

}
