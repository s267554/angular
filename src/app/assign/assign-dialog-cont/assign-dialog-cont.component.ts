import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subscription} from 'rxjs';
import {MatDialogRef} from '@angular/material/dialog';
import {VlService} from '../../vl.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {AssignService} from '../assign.service';
import {AssignStore} from '../assign-store';

@Component({
  selector: 'app-assign-dialog-cont',
  templateUrl: './assign-dialog-cont.component.html',
  styleUrls: ['./assign-dialog-cont.component.css']
})
export class AssignDialogContComponent implements OnInit, OnDestroy {

  private sub: Subscription = null;
  errorMsg: any;

  constructor(public dialog: MatDialogRef<AssignDialogContComponent>,
              private readonly assignService: AssignService,
              private readonly assignStore: AssignStore,
              private readonly vlService: VlService,
              private readonly snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
  }

  submit(assign: FormData) {
    let observable: Observable<any>;
    observable = this.assignService.addAssignment(this.vlService.getCourse(), assign);
    this.sub = observable.subscribe(
      (value) => {
        this.dialog.close(value);
      },
      (error) => {
        this.errorMsg = error.error.message;
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
