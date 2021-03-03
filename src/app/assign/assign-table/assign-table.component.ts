import {AfterViewInit, Component, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {Assignment} from '../assign.model';
import {AssignService} from '../assign.service';
import {MatTableDataSource} from '@angular/material/table';
import {User} from '../../auth/user.model';
import {Observable, Subscription} from 'rxjs';
import {AssignStore} from '../assign-store';
import {MatSort} from '@angular/material/sort';

@Component({
  selector: 'app-assign-table',
  templateUrl: './assign-table.component.html',
  styleUrls: ['./assign-table.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed, void', style({ height: '0px', minHeight: '0', display: 'none' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
      transition('expanded <=> void', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)'))
    ])
  ],
})
export class AssignTableComponent implements OnInit, OnDestroy, AfterViewInit {

  @Input() displayedColumns = ['id', 'creationDate', 'expiryDate', 'url'];


  dataSource: MatTableDataSource<Assignment> = new MatTableDataSource<Assignment>();

  // tslint:disable-next-line:variable-name
  private _assignments = [];

  @Input() user: User;
  @Input() admin: boolean;

  @ViewChild(MatSort) sort: MatSort;

  private sub: Subscription;

  assignments: Observable<Assignment[]>;

  expandedElement: any;

  constructor(private readonly assignService: AssignService,
              private readonly assignStore: AssignStore) {
    this.assignments = assignStore.assign$;
    this.sub = this.assignments.subscribe(next => {
      this._assignments = next;
      this.dataSource.data = next;
    });
  }

  ngOnInit(): void {

  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  readPaper(row: Assignment) {
    if (!this.admin) {
      this.assignService.readAssignment(row);
    }
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
