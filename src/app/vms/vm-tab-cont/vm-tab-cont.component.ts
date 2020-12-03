import {Component, OnInit} from '@angular/core';
import {VmsService} from '../vms.service';
import {Student} from '../../student/student.model';
import {Observable} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';
import {retry, switchMap} from 'rxjs/operators';
import {VirtualMachine} from '../virtual-machine';

@Component({
  selector: 'app-vm-tab-cont',
  templateUrl: './vm-tab-cont.component.html',
  styleUrls: ['./vm-tab-cont.component.css']
})
export class VmTabContComponent implements OnInit {

  owners$: Observable<Student[]>;

  vm: VirtualMachine;

  constructor(private readonly vmsService: VmsService,
              private readonly route: ActivatedRoute,
              private readonly router: Router) {
  }

  ngOnInit(): void {
    this.vm = this.router.getCurrentNavigation().extras.state as VirtualMachine;
    this.owners$ = this.route.params.pipe(
      switchMap(p => this.vmsService.getOwners(p.vmId)),
      retry(3)
    );
  }

}
