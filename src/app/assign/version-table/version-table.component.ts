import {AfterViewInit, Component, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {AssignStore} from '../assign-store';
import {Version} from '../version.model';
import {Subscription} from 'rxjs';
import {Assignment} from '../assign.model';
import {filter} from 'rxjs/operators';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {VersionDialogContComponent} from '../version-dialog-cont/version-dialog-cont.component';
import {MatSort} from '@angular/material/sort';

@Component({
  selector: 'app-version-table',
  templateUrl: './version-table.component.html',
  styleUrls: ['./version-table.component.css']
})
export class VersionTableComponent implements OnInit, AfterViewInit, OnDestroy {

  displayedColumns: string[] = ['id', 'date', 'contentUrl'];
  dataSource: MatTableDataSource<Version> = new MatTableDataSource<Version>();

  @Input() assignment: Assignment;
  @Input() studentName: string;
  @Input() admin: boolean;
  @ViewChild(MatSort) sort: MatSort;

  private subs: Subscription;

  constructor(private readonly assignStore: AssignStore,
              private readonly dialog: MatDialog) {  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.subs = this.assignStore.version$(this.assignment.id, this.studentName).subscribe(data => {
      this.dataSource.data = data;
    });
    this.dataSource.sort = this.sort;
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  addVersion() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = this.assignment.id;
    const dialogRef = this.dialog.open(VersionDialogContComponent, dialogConfig);
    dialogRef.afterClosed()
      .pipe(
        filter(value => (value as Version) !== undefined)
      )
      .subscribe(result => this.dataSource.data = this.dataSource.data.concat(result));
  }

}
