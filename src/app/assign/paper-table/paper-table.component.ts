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
import {VersionDialogContComponent} from '../version-dialog-cont/version-dialog-cont.component';
import {filter} from 'rxjs/operators';
import {Version} from '../version.model';
import {MatDialog} from '@angular/material/dialog';
import {PaperDialogContComponent} from '../paper-dialog-cont/paper-dialog-cont.component';

@Component({
  selector: 'app-paper-table',
  templateUrl: './paper-table.component.html',
  styleUrls: ['./paper-table.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed',
        style({
          height: '0px',
          minHeight: '0',
          visibility: 'hidden'
        })
      ),
      state('expanded',
        style({
          height: '*',
          visibility: 'visible'
        })
      ),
      transition('expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      )
    ])
  ]
})
export class PaperTableComponent implements AfterViewInit, OnInit, OnDestroy {

  displayedColumns: string[] = ['student', 'status', 'vote', 'enabled', 'action'];
  dataSource: MatTableDataSource<Paper> = new MatTableDataSource<Paper>();

  @Input() assignment: Assignment;
  @Input() admin: boolean;

  @ViewChild(MatSort) sort: MatSort;

  expandedElement: any;

  readSub: Subscription;

  // tslint:disable-next-line:variable-name
  private _papers: Paper[];

  set papers(p: Paper[]) {
    const rows = [];
    p.forEach(element => rows.push({detailRow: false, element}, {detailRow: true, element}));
    this.dataSource.data = rows;
  }

  isExpansionDetailRow(i: number, row: any) {
    return row.detailRow;
  }

  constructor(private readonly assignStore: AssignStore,
              private assignService: AssignService,
              private readonly dialog: MatDialog) {
    this.readSub = assignService.assignmentRead$.subscribe(
      a => {
        if (this.assignment.id === a.id && this._papers.find(paper => paper.status === 'NULL')) {
          this.assignService.readPaper(a.id).subscribe(result => {
            this.papers = [result];
          });
        }
      }
    );
  }

  ngOnInit() {
    // tslint:disable-next-line:no-shadowed-variable
    this.dataSource.filterPredicate = (data, filter) => {
      const obj = data as unknown as {detailRow: boolean, element: Paper};
      return obj.element.status.toLowerCase().includes(filter);
    };
  }

  ngAfterViewInit() {
    this.assignStore.papers$(this.assignment.id).subscribe(data => {
      this._papers = data;
      this.papers = data;
    });
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: MatSelectChange) {
    this.dataSource.filter = event.value;
  }

  ngOnDestroy() {
    this.readSub.unsubscribe();
  }


  revisePaper(row: Paper) {
    this.dialog.open(PaperDialogContComponent, {data: row}).afterClosed()
      .pipe(
        filter(value => (value as Paper).assignmentId !== undefined)
      )
      .subscribe(result => this.papers = this._papers.map(paper => {
        if (paper.student.id === result.student.id) {
          return result; } else { return paper; }
    }));
  }

  isRevisable(row: Paper) {
    return row.status === 'CONSEGNATO';
  }
}
