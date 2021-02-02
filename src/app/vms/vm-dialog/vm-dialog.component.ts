import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MyTeam} from '../../myteam/myteam.model';
import {VirtualMachine} from '../virtual-machine';
import {VmsService} from '../vms.service';
import {VlService} from '../../vl.service';
import {ActivatedRoute, Router} from '@angular/router';
import {MyTeamService} from '../../myteam/myteam.service';

@Component({
  selector: 'app-vm-dialog',
  templateUrl: './vm-dialog.component.html',
  styleUrls: ['./vm-dialog.component.css']
})
export class VmDialogComponent implements OnInit {

  // tslint:disable-next-line:variable-name
  private readonly _save$ = new EventEmitter<VirtualMachine>();
  @Output() readonly save$ = this._save$.asObservable();

  @Input() set virtualMachine(vm: VirtualMachine | null) {
    if (vm !== null) {
      this.setupVM(vm);
    } else {
      this.setupNew();
    }
  }

  constructor(private readonly vmsService: VmsService,
              private readonly vlService: VlService,
              private readonly activatedRoute: ActivatedRoute,
              private readonly router: Router,
              private readonly teamService: MyTeamService) {
  }

  vcpu: number;

  ram: number;

  space: number;

  creator: string;

  id: number;

  team: MyTeam;

  private setupNew() {
    this.vcpu = 0;
    this.ram = 0;
    this.space = 0;
  }

  private setupVM(vm: VirtualMachine) {
    this.vcpu = vm.vcpu;
    this.ram = vm.ram;
    this.space = vm.space;
    this.id = vm.id;
  }

  save() {
    const vm: VirtualMachine = {
      vcpu: this.vcpu,
      ram: this.ram,
      space: this.space,
      id: this.id,
      url: 'http://google.com',
      active: true
    };
    this._save$.emit(vm);
  }

  ngOnInit(): void {
    this.team = this.teamService.myTeam;
  }


}
