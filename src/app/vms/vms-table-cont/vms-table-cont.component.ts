import {Component, Input, OnInit} from '@angular/core';
import {VmsService} from '../vms.service';
import {Observable} from 'rxjs';
import {VirtualMachine} from '../virtual-machine';
import {retry, shareReplay, switchMap} from 'rxjs/operators';
import {VlService} from '../../vl.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-vms-table-cont',
  templateUrl: './vms-table-cont.component.html',
  styleUrls: ['./vms-table-cont.component.css']
})
export class VmsTableContComponent implements OnInit {

  @Input() teamName: string;

  vms$: Observable<VirtualMachine[]>;

  constructor(private readonly vmsService: VmsService,
              private readonly vlService: VlService,
              private readonly activatedRoute: ActivatedRoute,
              private readonly router: Router) {
  }

  ngOnInit(): void {
    this.vms$ = this.vlService.course$.pipe(
      switchMap(name => this.vmsService.getVms(name, this.teamName)),
      shareReplay(1),
      retry(3)
    );
  }

  selectVM(vm: VirtualMachine): Promise<boolean> {
    return this.router.navigate(
      ['./', this.teamName, 'vms', vm.id],
      {relativeTo: this.activatedRoute, state: vm}
    );
  }

}
