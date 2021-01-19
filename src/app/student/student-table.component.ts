import {AfterViewInit, Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {Student} from './student.model';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {StudentDataSource} from './student.data-source';
import {MatTable} from '@angular/material/table';
import {Subscription} from 'rxjs';
import {SelectionModel} from '@angular/cdk/collections';

@Component({
  selector: 'app-student-table',
  templateUrl: './student-table.component.html',
  styleUrls: ['./student-table.component.css']
})
export class StudentTableComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild(MatPaginator) private readonly paginator: MatPaginator;
  @ViewChild(MatTable) private readonly table: MatTable<Student>;
  @ViewChild(MatSort) private readonly sort: MatSort;

  // tslint:disable-next-line:variable-name
  private readonly _deleteAll = new EventEmitter<Student[]>();
  @Output() readonly deleteAll = this._deleteAll.asObservable();

  @Input() set students(students: Student[] | null) {
    if (students != null) {
      this.dataSource.emit(students);
      this.selection.clear();
    }
  }

  @Input() columns = ['select', 'id', 'name', 'surname', 'team'];

  readonly selection = new SelectionModel<Student>(true, []);

  readonly dataSource = new StudentDataSource();

  private subs: Subscription[] = [];

  constructor() {
  }

  ngOnInit(): void {
    this.subs.push(
      this.dataSource.page$.subscribe((p) => {
        this.onPageChange(p);
      })
    );
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.table.dataSource = this.dataSource;
  }

  ngOnDestroy(): void {
    this.subs.forEach((s) => {
      s.unsubscribe();
    });
    this.subs = [];
  }

  private onPageChange(page: Student[]) {
    this.selection.selected.forEach((s1) => {
      const remove = page.find((s2) => {
        return s1 === s2;
      }) === undefined;
      if (remove) {
        this.selection.deselect(s1);
      }
    });
  }

  isAllSelected(): boolean {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.getPage().length;
    return numSelected === numRows;
  }

  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.getPage().forEach(row => this.selection.select(row));
  }

  deleteAllSelected() {
    const students = this.selection.selected;
    this._deleteAll.emit(students);
  }

}


