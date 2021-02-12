import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subscription} from 'rxjs';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {AssignService} from '../assign.service';
import {AssignStore} from '../assign-store';
import {VlService} from '../../vl.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Version} from '../version.model';
import {retry} from 'rxjs/operators';

@Component({
  selector: 'app-version-dialog-cont',
  templateUrl: './version-dialog-cont.component.html',
  styleUrls: ['./version-dialog-cont.component.css']
})
export class VersionDialogContComponent implements OnInit, OnDestroy {

  private sub: Subscription = null;
  assignmentId: number;

  constructor(private readonly dialog: MatDialogRef<VersionDialogContComponent>,
              @Inject(MAT_DIALOG_DATA) readonly data: number,
              private readonly assignService: AssignService,
              private readonly assignStore: AssignStore,
              private readonly vlService: VlService,
              private readonly snackBar: MatSnackBar) {
    this.assignmentId = data;
  }

  ngOnInit(): void {
  }

  submit(version: Version) {
    let observable: Observable<any>;
    observable = this.assignService.createVersion(this.assignmentId, version);
    this.sub = observable.pipe(retry(3)).subscribe(
      (value) => {
        this.dialog.close(value);
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
