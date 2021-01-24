import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subscription} from 'rxjs';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {VirtualMachine} from '../virtual-machine';
import {VmsService} from '../vms.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {VlService} from '../../vl.service';
import {MyTeamService} from '../../myteam/myteam.service';

@Component({
  selector: 'app-vm-dialog-cont',
  templateUrl: './vm-dialog-cont.component.html',
  styleUrls: ['./vm-dialog-cont.component.css']
})
export class VmDialogContComponent implements OnInit, OnDestroy {

  private sub: Subscription = null;

  constructor(private readonly dialog: MatDialogRef<VmDialogContComponent>,
              @Inject(MAT_DIALOG_DATA) readonly data: VirtualMachine | null,
              private readonly vmsService: VmsService,
              private readonly teamService: MyTeamService,
              private readonly vlService: VlService,
              private readonly snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
  }

  submit(vm: any) {
    let observable: Observable<any>;
    if (this.data === null) {
      observable = this.vmsService.createVM(this.vlService.getCourse(), this.teamService.myTeam.name, vm);
    } else {
      observable = this.vmsService.updateVM(this.vlService.getCourse(), this.teamService.myTeam.name, vm);
    }
    this.sub = observable.subscribe(
      () => {
        this.dialog.close();
      },
      () => {
        this.snackBar.open('Something went wrong');
      }
    );
  }

  ngOnDestroy(): void {
    if (this.sub !== null) {
      this.sub.unsubscribe();
      this.sub = null;
    }
  }

}
