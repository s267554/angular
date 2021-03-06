import {AfterViewInit, Component, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {Paper} from '../paper.model';
import {AssignStore} from '../assign-store';
import {MatSelectChange} from '@angular/material/select';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {AssignService} from '../assign.service';
import {Subscription} from 'rxjs';
import {Assignment} from '../assign.model';
import {filter} from 'rxjs/operators';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {PaperDialogContComponent} from '../paper-dialog-cont/paper-dialog-cont.component';

@Component({
  selector: 'app-paper-table',
  templateUrl: './paper-table.component.html',
  styleUrls: ['./paper-table.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed, void', style({ height: '0px', minHeight: '0', display: 'none' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
      transition('expanded <=> void', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)'))
    ])
  ],
})
export class PaperTableComponent implements AfterViewInit, OnInit, OnDestroy {

  displayedColumns: string[] = ['student', 'status', 'vote', 'enabled', 'action'];
  dataSource: MatTableDataSource<Paper> = new MatTableDataSource<Paper>();

  @Input() assignment: Assignment;
  @Input() admin: boolean;

  @ViewChild(MatSort) sort: MatSort;

  expandedElement: any;

  readSub: Subscription;
  expandSub: Subscription;
  paperSub: Subscription;
  submitSub: Subscription;

  loaded = false;
  empty = true;

  // tslint:disable-next-line:variable-name
  private _papers: Paper[] = [];

  set papers(p: Paper[]) {
    this._papers = p;
    this.dataSource.data = p;
    if (p.length > 0) {
      this.empty = false;
    }
  }

  constructor(private readonly assignStore: AssignStore,
              private assignService: AssignService,
              private readonly dialog: MatDialog) {
  }

  ngOnInit() {
    this.readSub = this.assignService.assignmentRead$.subscribe(
      a => {
        if (this.assignment.id === a.id && this._papers?.find(paper => paper.status === 'NULL')) {
          this.assignService.readPaper(a.id).subscribe(result => this.papers = [result]);
        }
      }
    );
    this.expandSub = this.assignService.assignmentExpand$.subscribe(
      a => {
        if (this.assignment.id === a.id && !this.loaded && this.paperSub === undefined) {
          this.paperSub = this.assignStore.papers$(this.assignment.id).subscribe(data => {
            this.papers = data;
            this.loaded = true;
          });
        }
      }
    );
    this.submitSub = this.assignService.paperSubmit$.subscribe(
      assignId => {
        if (assignId === this.assignment.id) {
          // tanto succede solo da studente quando ho solo un paper per assignment
          this._papers.forEach(p => p.status = 'CONSEGNATO');
        }
      }
    );
    this.dataSource.filterPredicate = (data, filterString) => {
      return data.status.toLowerCase().includes(filterString);
    };
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: MatSelectChange) {
    this.dataSource.filter = event.value;
  }

  ngOnDestroy() {
    this.readSub.unsubscribe();
    this.expandSub.unsubscribe();
    this.paperSub?.unsubscribe();
  }


  revisePaper(row: Paper) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = row;
    const dialogRef = this.dialog.open(PaperDialogContComponent, dialogConfig);
    dialogRef.afterClosed()
      .pipe(
        filter(value => (value as Paper) !== undefined)
      )
      .subscribe(newPaper => this.papers = this._papers.map(oldPaper => {
        return oldPaper.student.id === newPaper.student.id ? newPaper : oldPaper;
      }));
  }

  isRevisable(row: Paper) {
    return row.status === 'CONSEGNATO';
  }

  expandRow(row: Paper) {
    this.expandedElement === row ? this.expandedElement = null : this.expandedElement = row;
    if (this.expandedElement === row) {
      this.assignService.expandPaper(row);
    }
  }
}
