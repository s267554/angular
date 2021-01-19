import {Component, Input, OnInit} from '@angular/core';
import {VmsService} from '../vms.service';
import {Observable} from 'rxjs';
import {VirtualMachine} from '../virtual-machine';
import {retry, shareReplay, switchMap} from 'rxjs/operators';
import {VlService} from '../../vl.service';
import {ActivatedRoute, Router} from '@angular/router';
import {MyTeamService} from '../../myteam/myteam.service';

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
              private readonly router: Router,
              private readonly teamService: MyTeamService) {
  }

  ngOnInit(): void {
    if (this.teamName == null) {
      const team = this.teamService.myTeam;
      if ( team != null) {
        this.teamName = team.name;
      }
    }
    if (this.teamName != null) {
      this.vms$ = this.vlService.course$.pipe(
        switchMap(name => this.vmsService.getVms(name, this.teamName)),
        shareReplay(1),
        retry(3)
      );
    }
  }

  selectVM(vm: VirtualMachine): Promise<boolean> {
    return this.router.navigate(
      ['./', this.teamName, 'vms', vm.id],
      {relativeTo: this.activatedRoute, state: vm}
    );
  }

}
