import {Component, OnInit} from '@angular/core';
import {AssignStore} from '../assign-store';
import {AuthService} from '../../auth/auth.service';
import {isAdmin, User} from '../../auth/user.model';
import {filter} from 'rxjs/operators';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {AssignDialogContComponent} from '../assign-dialog-cont/assign-dialog-cont.component';
import {Assignment} from '../assign.model';

@Component({
  selector: 'app-assign-table-cont',
  templateUrl: './assign-table-cont.component.html',
  styleUrls: ['./assign-table-cont.component.css']
})
export class AssignTableContComponent implements OnInit {

  user: User;
  admin: boolean;

  constructor(readonly assignStore: AssignStore,
              private readonly authService: AuthService,
              public dialog: MatDialog) {
    this.authService.loginEvent$.subscribe(next => {this.user = next; this.admin = isAdmin(next); });
  }

  ngOnInit(): void {
  }

  addAssignment() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = null;
    const dialogRef = this.dialog.open(AssignDialogContComponent, dialogConfig);
    dialogRef.afterClosed()
      .pipe(
        filter(value => (value as Assignment) !== undefined)
      )
      .subscribe(result => {console.log(result); this.assignStore.addAssignment(result); });
  }
}
