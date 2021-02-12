import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {Assignment} from '../assign.model';
import {AssignService} from '../assign.service';
import {MatTableDataSource} from '@angular/material/table';
import {AuthService} from '../../auth/auth.service';
import {isAdmin, User} from '../../auth/user.model';
import {Observable, Subscription} from 'rxjs';
import {AssignStore} from '../assign-store';

@Component({
  selector: 'app-assign-table',
  templateUrl: './assign-table.component.html',
  styleUrls: ['./assign-table.component.css'],
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
export class AssignTableComponent implements OnInit, OnDestroy {

  @Input() displayedColumns = ['id', 'creation', 'expiration', 'url'];


  dataSource: MatTableDataSource<Assignment> = new MatTableDataSource<Assignment>();

  // tslint:disable-next-line:variable-name
  private _assignments = [];
  @Input() user: User;
  @Input() admin: boolean;
  sub: Subscription;

  assignments: Observable<Assignment[]>;

  expandedElement: any;

  constructor(private readonly assignService: AssignService,
              private readonly assignStore: AssignStore) {
    this.assignments = assignStore.assign$;
    this.sub = this.assignments.subscribe(next => {
      const rows = [];
      const ref = next !== null ? next : [];
      ref.forEach(element => rows.push(element, {detailRow: true, element}));
      this._assignments = next;
      this.dataSource.data = rows;
    });
  }

  isExpansionDetailRow(i: number, row: any) {
    return row.hasOwnProperty('detailRow');
  }

  ngOnInit(): void {
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
