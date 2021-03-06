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
import {AssignService} from '../assign.service';

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

  expandSub: Subscription;
  paperSub: Subscription;

  loaded = false;
  empty = true;

  constructor(private readonly assignStore: AssignStore,
              private readonly assignService: AssignService,
              private readonly dialog: MatDialog) {  }

  ngOnInit() {
    this.expandSub = this.assignService.paperExpand$.subscribe(
      p => {
        if (this.assignment.id === p.assignmentId && this.studentName === p.student.id && !this.loaded && this.paperSub === undefined) {
          this.paperSub = this.assignStore.version$(p.assignmentId, p.student.id).subscribe(data => {
            this.dataSource.data = data;
            this.loaded = true;
            if (data.length > 0) {
              this.empty = false;
            }
          });
        }
      }
    );
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  ngOnDestroy() {
    this.expandSub.unsubscribe();
    this.paperSub?.unsubscribe();
  }

  addVersion() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = this.assignment.id;
    const dialogRef = this.dialog.open(VersionDialogContComponent, dialogConfig);
    dialogRef.afterClosed()
      .pipe(
        filter(value => value as Version !== undefined)
      )
      .subscribe(result => this.dataSource.data = this.dataSource.data.concat(result));
  }

}
