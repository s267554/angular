import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subscription} from 'rxjs';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {AssignService} from '../assign.service';
import {AssignStore} from '../assign-store';
import {VlService} from '../../vl.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Paper} from '../paper.model';

@Component({
  selector: 'app-paper-dialog-cont',
  templateUrl: './paper-dialog-cont.component.html',
  styleUrls: ['./paper-dialog-cont.component.css']
})
export class PaperDialogContComponent implements OnInit, OnDestroy {

  private sub: Subscription = null;
  errorMsg: any;

  constructor(private readonly dialog: MatDialogRef<PaperDialogContComponent>,
              @Inject(MAT_DIALOG_DATA) readonly data: Paper,
              private readonly assignService: AssignService,
              private readonly assignStore: AssignStore,
              private readonly vlService: VlService,
              private readonly snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
  }

  submit(paper: any) {
    let observable: Observable<any>;
    observable = this.assignService.updatePaper(paper);
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
