import {Component, Input, OnInit} from '@angular/core';
import {VmsService} from '../vms.service';
import {BehaviorSubject, Observable} from 'rxjs';
import {VirtualMachine} from '../virtual-machine';
import {retry, shareReplay, switchMap, map, filter} from 'rxjs/operators';
import {VlService} from '../../vl.service';
import {ActivatedRoute, Router} from '@angular/router';
import {MyTeamService} from '../../myteam/myteam.service';
import {VmDialogContComponent} from '../vm-dialog-cont/vm-dialog-cont.component';
import {MatDialog} from '@angular/material/dialog';
import {Team} from '../../team/team.model';

@Component({
  selector: 'app-vms-table-cont',
  templateUrl: './vms-table-cont.component.html',
  styleUrls: ['./vms-table-cont.component.css']
})
export class VmsTableContComponent implements OnInit {

  @Input() teamName: string;

  @Input() columns: string[] = ['id', 'status', 'url'];

  @Input() team: Team;

  // tslint:disable-next-line:variable-name
  _vms$ = new BehaviorSubject<VirtualMachine[]>([]);
  readonly vms$ = this._vms$.asObservable();

  totcpu$: Observable<number>;
  totram$: Observable<number>;
  totspace$: Observable<number>;

  isUser = false;

  constructor(readonly vmsService: VmsService,
              private readonly vlService: VlService,
              private readonly activatedRoute: ActivatedRoute,
              private readonly router: Router,
              private readonly teamService: MyTeamService,
              private readonly dialog: MatDialog) {
  }

  ngOnInit(): void {
    if (this.teamName == null) {
      const team = this.teamService.myTeam;
      if ( team != null) {
        this.teamName = team.name;
      }
      this.columns.push('edit', 'power', 'delete');
      this.team = this.teamService.myTeam;
      this.isUser = true;
    }
    if (this.teamName != null) {
      this.vlService.course$.pipe(
        switchMap(name => this.vmsService.getVms(name, this.teamName)),
        shareReplay(1),
        retry(3)
      );
    }
    this.vmsService.getVms(this.team.courseName, this.team.name).subscribe(value => this._vms$.next(value));
    this.totcpu$ = this.vms$.pipe(map(vms => {
      if (vms.length > 0) {
        return vms.map(value => value.vcpu).reduce((acc, value) => acc + value);
      } else {
        return 0;
      }
    }));
    this.totram$ = this.vms$.pipe(map(vms => {
      if (vms.length > 0) {
        return vms.map(value => value.ram).reduce((acc, value) => acc + value);
      } else {
        return 0;
      }
    }));
    this.totspace$ = this.vms$.pipe(map(vms => {
      if (vms.length > 0) {
        return vms.map(value => value.space).reduce((acc, value) => acc + value);
      } else {
        return 0;
      }
    }));
  }

  selectVM(vm: VirtualMachine): Promise<boolean> {
    return this.router.navigate(
      ['./', this.teamName, 'vms', vm.id],
      {relativeTo: this.activatedRoute, state: vm}
    );
  }

  updateVM($event: VirtualMachine) {
    this.dialog.open(VmDialogContComponent, {data: $event}).afterClosed()
      .pipe(
        filter(value => (value as VirtualMachine).vcpu !== undefined)
      )
      .subscribe(result => this._vms$.next(this._vms$.value.map(old => {
        return old.id === result.id ? result : old;
      })));
  }

  createVM() {
    this.dialog.open(VmDialogContComponent, {data: null}).afterClosed()
      .pipe(
        filter(value => (value as VirtualMachine).vcpu !== undefined)
      )
      .subscribe(result => {console.log(result); this._vms$.next(this._vms$.getValue().concat(result)); });
  }

  powerVM($event: VirtualMachine) {
    // copy
    const vm = {...$event};
    vm.active = !vm.active;
    this.vmsService.updateVM(this.vlService.getCourse(), this.team.name, vm)
      .subscribe(result => this._vms$.next(this._vms$.value.map(old => {
      return old.id === result.id ? result : old;
    })),
        error => console.log(error));
  }

  deleteVM($event: VirtualMachine) {
    this.vmsService.deleteVM(this.vlService.getCourse(), this.team.name, $event)
      .subscribe(result => this._vms$.next(this._vms$.value.filter(value => value.id !== $event.id)),
        error => console.log(error));
  }

}
